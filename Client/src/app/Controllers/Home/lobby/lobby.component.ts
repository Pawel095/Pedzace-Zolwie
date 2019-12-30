import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Events } from 'src/app/Enums/Events';
import { GameModes } from 'src/app/Enums/GameModes';
import { CustomSocket } from 'src/app/Models/CustomSocket';
import { ClientService } from 'src/app/Servces/client.service';
import { GameService } from 'src/app/Servces/game.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
    debug = !environment.production;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private gs: GameService,
        private sb: MatSnackBar,
        private cs: ClientService,
        private dialog: MatDialog
    ) {}
    data: { available: boolean; spotsLeft: number }[] = [{ available: false, spotsLeft: 0 }];
    form = this.fb.group(
        {
            protocol: ['http://', [Validators.required]],
            hostname: ['localhost', [Validators.required, hostnameValidator()]],
            port: [1234, [Validators.required, portValidator()]],
        },
        {
            validators: [totalValidator()],
            asyncValidators: [ServerValidator(this.data)],
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
    get url() {
        return this.protocol.value + this.hostname.value + ':' + this.port.value;
    }

    submit() {
        if (this.data[0].available) {
            if (this.data[0].spotsLeft > 0) {
                this.gs.setup(GameModes.MULTIPLAYER, { url: this.url });
                this.router.navigateByUrl('/game');
            } else {
                this.sb.open('There are no spots left. ', 'OK');
            }
        } else {
            this.sb.open('The server is busy.', 'OK');
        }
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

function ServerValidator(GlobalData: { available: boolean; spotsLeft: number }[]): ValidatorFn {
    let lastcheck = 0;
    let lastResult: ValidationErrors | null;
    return (ctrl: FormGroup): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const protocol = ctrl.get('protocol');
        const hostname = ctrl.get('hostname');
        const port = ctrl.get('port');
        const url = protocol.value + hostname.value + ':' + port.value;

        return new Promise(res => {
            if (lastcheck + 1000 < new Date().getTime()) {
                lastcheck = new Date().getTime();
                const socket = new CustomSocket({
                    url,
                    options: {
                        reconection: false,
                        reconnectionAttempts: 0,
                        timeout: 1000,
                        randomizationFactor: 0,
                        reconnectionDelay: 1000,
                    },
                });
                socket.on('connect', () => {
                    console.log('connected');
                    socket.emit(Events.checkIfAvailable, (data: { available: boolean; spotsLeft: number }) => {
                        GlobalData[0] = data;
                        socket.disconnect();
                    });
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
                }, 1000);
            }
        });
    };
}
