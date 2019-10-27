import { Component, OnInit } from "@angular/core";
import { CardTypes } from "../Enums/CardTypes";
import { TurtleColours } from "../Enums/TurtleColours";
import { Card } from "../Models/Card";
import { GameStateService } from "../Servces/game-state.service";

@Component({
    selector: "app-debug",
    templateUrl: "./debug.component.html",
    styleUrls: ["./debug.component.scss"]
})
export class DebugComponent implements OnInit {
    constructor(private gss: GameStateService) {}

    ngOnInit() {}

    click() {
        const c: Card = new Card();
        c.type = CardTypes.COLOUR_ONE_FORWARD;
        c.colour = TurtleColours.BLUE;
        this.gss.playerMove(this.gss.debugGet0thPlayerId(), c);
    }
}
