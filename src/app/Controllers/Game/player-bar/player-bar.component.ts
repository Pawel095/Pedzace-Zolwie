import { Component, OnInit } from '@angular/core';
import { CardTypes } from 'src/app/Enums/CardTypes';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { Card } from 'src/app/Models/Card';
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
        discarded: boolean;
    }> = [
        {
            n: 1,
            id: 123,
            type: PlayerTypes.AI,
            card: new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RED),
            highlighted: false,
            discarded: false,
        },
        { n: 2, id: 345, type: PlayerTypes.HUMAN, card: undefined, highlighted: false, discarded: false },
    ];
    last: {
        n: number;
        id: number;
        type: PlayerTypes;
        card: Card;
        highlighted: boolean;
        discarded: boolean;
    };

    ngOnInit() {
        this.list = this.gss.getInitialPlayerBarData();
        this.last = this.list[0];
        this.gss.currentTurn$.subscribe(id => {
            const current = this.list.find(e => e.id === id);
            this.last.highlighted = false;
            current.highlighted = true;
            this.last = current;
        });

        this.gss.PlayerBarCardUpdates$.subscribe((data: { id: number; card: Card | null }) => {
            const player = this.list.find(e => e.id === data.id);
            if (data.card != null) {
                player.card = null;
                player.card = data.card;
                player.discarded = false;
            } else {
                player.discarded = true;
                player.card = undefined;
            }
        });
    }
}
