import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Servces/client.service';
import { Move } from 'src/app/Models/Move';
import { Card } from 'src/app/Models/Card';
import { CardTypes } from 'src/app/Enums/CardTypes';
import { TurtleColour2Path } from 'src/app/Utils/turtleColour2Path';
import { TurtleColours } from 'src/app/Enums/TurtleColours';

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
