import { Component, OnInit } from '@angular/core';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';
import { CardTypes } from 'src/app/Enums/CardTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';

@Component({
    selector: 'app-player-bar',
    templateUrl: './player-bar.component.html',
    styleUrls: ['./player-bar.component.scss'],
})
export class PlayerBarComponent implements OnInit {
    constructor() {}
    list = [
        { n: 1, type: PlayerTypes.AI, card: new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RED) },
        { n: 2, type: PlayerTypes.HUMAN, card: undefined },
    ];
    ngOnInit() {}
}
