import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-game-view",
  templateUrl: "./new-game-view.component.html",
  styleUrls: ["./new-game-view.component.scss"]
})
export class NewGameViewComponent implements OnInit {
  gameMode: string;

  vsAi: boolean;
  vsHs: boolean;
  vsMp: boolean;

  constructor() {}

  ngOnInit() {}

  onSubmit() {}
}
