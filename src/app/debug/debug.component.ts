import { Component, OnInit } from "@angular/core";
import { GameStateService } from "../Servces/game-state.service";

@Component({
    selector: "app-debug",
    templateUrl: "./debug.component.html",
    styleUrls: ["./debug.component.scss"]
})
export class DebugComponent implements OnInit {
    constructor(private gss: GameStateService) {}

    ngOnInit() {}
    click() {}
}
