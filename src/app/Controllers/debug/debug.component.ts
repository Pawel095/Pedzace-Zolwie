import { Component, OnInit } from '@angular/core';
import { CardTypes } from '../../Enums/CardTypes';
import { TurtleColours } from '../../Enums/TurtleColours';
import { Card } from '../../Models/Card';
import { GameStateService } from '../../Servces/game-state.service';
import { Move } from '../../Models/Move';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
    constructor(private gss: GameStateService) {}

    ngOnInit() {}

    c_1() {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_ONE_BACK;
        c.colour = TurtleColours.RED;
        this.gss.playerMove(
            new Move(this.gss.debugGet0thPlayerId(), c, c.colour)
        );
    }

    c1() {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_ONE_FORWARD;
        c.colour = TurtleColours.RED;
        this.gss.playerMove(
            new Move(this.gss.debugGet0thPlayerId(), c, c.colour)
        );
    }
    c2() {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_TWO_FORWARD;
        c.colour = TurtleColours.RED;
        this.gss.playerMove(
            new Move(this.gss.debugGet0thPlayerId(), c, c.colour)
        );
    }
    l1() {
        const c: Card = new Card();
        c.type = CardTypes.LAST_ONE_FORWARD;
        c.colour = TurtleColours.RAINBOW;
        this.gss.playerMove(
            new Move(this.gss.debugGet0thPlayerId(), c, TurtleColours.RED)
        );
    }
    l2() {
        const c: Card = new Card();
        c.type = CardTypes.LAST_TWO_FORWARD;
        c.colour = TurtleColours.RAINBOW;
        this.gss.playerMove(
            new Move(this.gss.debugGet0thPlayerId(), c, TurtleColours.RED)
        );
    }
}
