import { Component, OnInit } from "@angular/core";
import { Card } from "../../Models/Card";
import { CardMarkings } from "../../Enums/CardMarkings";
import { TurtleColours } from "../../Enums/TurtleColours";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.scss"]
})
export class RulesComponent implements OnInit {
  C1: Card = new Card();
  C2: Card = new Card();
  L1: Card = new Card();
  L2: Card = new Card();
  C_1: Card = new Card();

  constructor() {
    this.C1.marking = CardMarkings.COLOUR_ONE_FORWARD;
    this.C1.colour = Math.floor(Math.random() * 6);

    this.C2.marking = CardMarkings.COLOUR_TWO_FORWARD;
    this.C2.colour = Math.floor(Math.random() * 6);

    this.L1.marking = CardMarkings.LAST_ONE_FORWARD;
    this.L1.colour = TurtleColours.RAINBOW;

    this.L2.marking = CardMarkings.LAST_TWO_FORWARD;
    this.L2.colour = TurtleColours.RAINBOW;

    this.C_1.marking = CardMarkings.COLOUR_ONE_BACK;
    this.C_1.colour = Math.floor(Math.random() * 6);
  }

  ngOnInit() {}
}
