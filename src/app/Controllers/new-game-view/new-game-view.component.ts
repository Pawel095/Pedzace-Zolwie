import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-new-game-view",
  templateUrl: "./new-game-view.component.html",
  styleUrls: ["./new-game-view.component.scss"]
})
export class NewGameViewComponent implements OnInit {
  gameMode: string;

  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(JSON.stringify(form.value));
  }
}
