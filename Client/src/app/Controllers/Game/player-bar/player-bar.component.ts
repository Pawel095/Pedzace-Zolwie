import { Component, OnInit } from '@angular/core';
import { GameModes } from 'src/app/Enums/GameModes';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';
import { InitialPlayerBarData } from 'src/app/Models/InitialPlayerBarData';
import { GameService } from 'src/app/Servces/game.service';

@Component({
    selector: 'app-player-bar',
    templateUrl: './player-bar.component.html',
    styleUrls: ['./player-bar.component.scss'],
})
export class PlayerBarComponent implements OnInit {
    constructor(private gs: GameService) {}
    list: Array<InitialPlayerBarData> = [
        { n: 1, id: 345, type: PlayerTypes.HUMAN, card: undefined, highlighted: false, discarded: false },
    ];
    last: InitialPlayerBarData;

    setup(data) {
        this.list = data;
        this.last = this.list[0];
        this.gs.currentTurn$.subscribe(id => {
            const current = this.list.find(e => e.id === id);
            this.last.highlighted = false;
            current.highlighted = true;
            this.last = current;
        });
    }

    ngOnInit() {
        if (this.gs.currentGamemode === GameModes.MULTIPLAYER) {
            (this.gs.getInitialPlayerBarData() as Promise<InitialPlayerBarData[]>).then(result => {
                this.setup(result);
            });
        } else {
            this.setup(this.gs.getInitialPlayerBarData() as InitialPlayerBarData[]);
        }

        this.gs.playerBarCardUpdates$.subscribe((data: { id: number; card: Card | null }) => {
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
