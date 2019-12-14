import { IPlayer } from './IPlayer';
import { GameStateService } from '../Servces/game-state.service';
import { PlayerTypes } from '../Enums/PlayerTypes';
import { Player } from '../Models/Player';
import { Move } from '../Models/Move';
import { Injectable } from '@angular/core';
import { TurtleColours } from '../Enums/TurtleColours';
import { Card } from '../Models/Card';
import { CardTypes } from '../Enums/CardTypes';
import { promise } from 'protractor';

export class AI implements IPlayer {
    constructor(private gss: GameStateService) {
        // this.gss.registerPlayer(this, PlayerTypes.AI);
    }

    player: Player;

    init(p: Player): void {
        this.player = p;
        console.log(p);
        this.gss.currentTurn$.subscribe((id: number) => {
            if (id === p.id) {
                console.log('JA!', p.id, id);
                const sleepPromise = new Promise(res => setTimeout(res, 1000)).then(() => {
                    this.gss.playerMove(
                        new Move(p.id, new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RED), TurtleColours.RED)
                    );
                });
            }
        });
    }
}
