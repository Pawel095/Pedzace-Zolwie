import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Servces/client.service';

@Component({
    selector: 'app-debug-view',
    templateUrl: './debug-view.component.html',
    styleUrls: ['./debug-view.component.scss'],
})
export class DebugViewComponent implements OnInit {
    constructor(private s: ClientService) {}

    ngOnInit() {
        this.s.connect();
    }
    emit() {
        this.s.emit();
    }
}
