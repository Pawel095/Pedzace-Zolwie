import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Servces/client.service';

@Component({
    selector: 'app-debug-view',
    templateUrl: './debug-view.component.html',
    styleUrls: ['./debug-view.component.scss'],
})
export class DebugViewComponent implements OnInit {
    constructor(private cs: ClientService) {}

    ngOnInit() {
        this.cs.connect();
    }
    emit() {
        this.cs.emit();
    }
}