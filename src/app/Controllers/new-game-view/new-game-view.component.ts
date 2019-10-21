import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { GameStateService } from "src/app/Servces/game-state.service";
import { GameModes } from "src/app/Enums/GameModes";

@Component({
  selector: "app-new-game-view",
  templateUrl: "./new-game-view.component.html",
  styleUrls: ["./new-game-view.component.scss"]
})
export class NewGameViewComponent implements OnInit {
  gss: GameStateService;

  // tslint:disable-next-line: variable-name
  constructor(private _gss: GameStateService) {
    this.gss = _gss;
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.gss.setup(GameModes.AI);
  }
}
