import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientService } from 'src/app/Servces/client.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    constructor(private cs: ClientService) {}
    debug = !environment.production;

    debugFunc() {
        this.cs.debug();
    }
}
