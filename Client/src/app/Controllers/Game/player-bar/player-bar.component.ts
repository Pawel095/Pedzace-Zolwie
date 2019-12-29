import { Component, OnInit } from '@angular/core';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { InitialPlayerBarData } from 'src/app/Servces/InitialPlayerBarData';
import { GameModes } from 'src/app/Enums/GameModes';
import { InitialNavigation } from '@angular/router';

@Component({
    selector: 'app-player-bar',
    templateUrl: './player-bar.component.html',
    styleUrls: ['./player-bar.component.scss'],
})
export class PlayerBarComponent implements OnInit {
    constructor(private gss: GameStateService) {}
    list: Array<InitialPlayerBarData> = [
        { n: 1, id: 345, type: PlayerTypes.HUMAN, card: undefined, highlighted: false, discarded: false },
    ];
    last: InitialPlayerBarData;

    ngOnInit() {
        if (this.gss.currentGamemode === GameModes.MULTIPLAYER) {
            (this.gss.getInitialPlayerBarData() as Promise<InitialPlayerBarData[]>).then(result => {
                this.list = result;
                this.last = this.list[0];
                this.gss.currentTurn$.subscribe(id => {
                    const current = this.list.find(e => e.id === id);
                    this.last.highlighted = false;
                    current.highlighted = true;
                    this.last = current;
                });
            });
        } else {
            this.list = this.gss.getInitialPlayerBarData() as InitialPlayerBarData[];
            this.last = this.list[0];
            this.gss.currentTurn$.subscribe(id => {
                const current = this.list.find(e => e.id === id);
                this.last.highlighted = false;
                current.highlighted = true;
                this.last = current;
            });
        }

        this.gss.playerBarCardUpdates$.subscribe((data: { id: number; card: Card | null }) => {
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
