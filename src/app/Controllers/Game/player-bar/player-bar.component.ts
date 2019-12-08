import { Component, OnInit } from '@angular/core';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';
import { CardTypes } from 'src/app/Enums/CardTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { GameStateService } from 'src/app/Servces/game-state.service';

@Component({
    selector: 'app-player-bar',
    templateUrl: './player-bar.component.html',
    styleUrls: ['./player-bar.component.scss'],
})
export class PlayerBarComponent implements OnInit {
    constructor(private gss: GameStateService) {}
    list: Array<{
        n: number;
        id: number;
        type: PlayerTypes;
        card: Card;
        highlighted: boolean;
    }> = [
        {
            n: 1,
            id: 123,
            type: PlayerTypes.AI,
            card: new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RED),
            highlighted: false,
        },
        { n: 2, id: 345, type: PlayerTypes.HUMAN, card: undefined, highlighted: false },
    ];
    last: {
        n: number;
        id: number;
        type: PlayerTypes;
        card: Card;
        highlighted: boolean;
    };
    ngOnInit() {
        this.list = this.gss.getInitialPlayerBarData();
        this.last = this.list[0];
        this.gss.currentTurn$.subscribe(id => {
            const current = this.list.find(e => e.id === id);
            current.highlighted = true;
            this.last.highlighted = false;
            this.last = current;
        });
    }
}
