import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomSocket } from 'src/app/Models/CustomSocket';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
    debug = !environment.production;
    constructor(private fb: FormBuilder) {}

    form = this.fb.group(
        {
            protocol: ['http://', [Validators.required]],
            hostname: ['localhost', [Validators.required, hostnameValidator()]],
            port: [1234, [Validators.required, portValidator()]],
        },
        {
            validators: [totalValidator()],
            asyncValidators: [ServerValidator()],
            updateOn: 'blur',
        }
    );
    get protocol() {
        return this.form.get('protocol');
    }
    get hostname() {
        return this.form.get('hostname');
    }
    get port() {
        return this.form.get('port');
    }
}

function portValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value > 1000 && control.value < 65535) {
            return null;
        } else {
            return { port: false };
        }
    };
}

function hostnameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (/^([a-zA-Z0-9-]|\.)*(?<![-\.]$)$/gm.test(control.value)) {
            return null;
        } else {
            return { hostname: false };
        }
    };
}

function totalValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
        const protocol = control.get('protocol');
        const hostname = control.get('hostname');
        const port = control.get('port');
        console.log(protocol.valid && hostname.valid && port.valid);
        if (protocol.valid && hostname.valid && port.valid) {
            return null;
        } else {
            return { TotalValidator: false };
        }
    };
}

function ServerValidator(): ValidatorFn {
    let lastcheck = 0;
    let lastResult: ValidationErrors | null;
    return (ctrl: FormGroup): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const protocol = ctrl.get('protocol');
        const hostname = ctrl.get('hostname');
        const port = ctrl.get('port');
        const url = protocol.value + hostname.value + ':' + port.value;

        return new Promise((res, err) => {
            if (lastcheck + 1000 < new Date().getTime()) {
                lastcheck = new Date().getTime();
                const socket = new CustomSocket({ url, options: { reconection: false, reconnectionAttempts: 0 } });
                socket.on('connect', () => {
                    console.log('connected');
                    socket.disconnect();
                    lastResult = null;
                    res(lastResult);
                });
                socket.on('connect_error', () => {
                    console.log('error');
                    socket.disconnect();
                    lastResult = { async: false };
                    res(lastResult);
                });
            } else {
                setTimeout(() => {
                    res(lastResult);
                }, 4000);
            }
        });
    };
}
