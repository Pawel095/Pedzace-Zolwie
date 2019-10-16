import { Component, OnInit } from "@angular/core";
import { Card } from "../Models/Card";
import { TurtleColours } from "../Enums/TurtleColours";

@Component({
  selector: "app-card-view",
  templateUrl: "./card-view.component.html",
  styleUrls: ["./card-view.component.scss"]
})
export class CardViewComponent implements OnInit {
  constructor() {
    for (let i = 0; i < 10; i++) {
      const card: Card = new Card();
      // card.colour = Math.floor(Math.random() * 5);
      card.colour = TurtleColours.BLUE;
      card.marking = Math.floor(Math.random() * 4);
      this.cards.push(card);
    }
  }
  cards: Array<Card> = [];
  ngOnInit() {}
}
