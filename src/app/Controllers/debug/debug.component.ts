import { Component, OnInit } from '@angular/core';
import { CardTypes } from '../../Enums/CardTypes';
import { TurtleColours } from '../../Enums/TurtleColours';
import { Card } from '../../Models/Card';
import { Move } from '../../Models/Move';
import { GameStateService } from '../../Servces/game-state.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
    constructor(private gss: GameStateService) {}

    ngOnInit() {}

    endGame() {
        this.gss.debugEndGame();
    }

    c_1(co: TurtleColours) {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_ONE_BACK;
        c.colour = co;
        this.gss.playerMove(new Move(this.gss.debugGetCurrentthPlayerId(), c, c.colour));
    }

    c1(co: TurtleColours) {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_ONE_FORWARD;
        c.colour = co;
        this.gss.playerMove(new Move(this.gss.debugGetCurrentthPlayerId(), c, c.colour));
    }
    c2(co: TurtleColours) {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_TWO_FORWARD;
        c.colour = co;
        this.gss.playerMove(new Move(this.gss.debugGetCurrentthPlayerId(), c, c.colour));
    }
    l1(co: TurtleColours) {
        const c: Card = new Card();
        c.type = CardTypes.LAST_ONE_FORWARD;
        c.colour = TurtleColours.RAINBOW;
        this.gss.playerMove(new Move(this.gss.debugGetCurrentthPlayerId(), c, co));
    }
    l2(co: TurtleColours) {
        const c: Card = new Card();
        c.type = CardTypes.LAST_TWO_FORWARD;
        c.colour = TurtleColours.RAINBOW;
        this.gss.playerMove(new Move(this.gss.debugGetCurrentthPlayerId(), c, co));
    }
}
