import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { GameModes } from "src/app/Enums/GameModes";
import { GameStateService } from "src/app/Servces/game-state.service";

@Component({
    selector: "app-new-game-view",
    templateUrl: "./new-game-view.component.html",
    styleUrls: ["./new-game-view.component.scss"]
})
export class NewGameViewComponent implements OnInit {
    gss: GameStateService;
    router: Router;
    // tslint:disable-next-line: variable-name
    constructor(private _gss: GameStateService, _router: Router) {
        this.gss = _gss;
        this.router = _router;
    }

    ngOnInit() {}

    onSubmit(form: NgForm) {
        this.gss.setup(GameModes.AI);
        this.router.navigateByUrl("game");
    }
}
