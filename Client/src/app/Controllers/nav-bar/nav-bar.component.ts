import { Component } from '@angular/core';
import { ClientService } from 'src/app/Servces/client.service';
import { environment } from 'src/environments/environment';

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
