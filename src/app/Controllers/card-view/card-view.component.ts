import { Component, OnInit } from "@angular/core";
import { Card } from "../../Models/Card";

@Component({
    selector: "app-card-view",
    templateUrl: "./card-view.component.html",
    styleUrls: ["./card-view.component.scss"]
})
export class CardViewComponent implements OnInit {
    cards: Array<Card> = [];
    constructor() {
        for (let i = 0; i < 10; i++) {
            // const card: Card = new Card();
            // card.colour = Math.floor(Math.random() * 6);
            // card.marking = Math.floor(Math.random() * 5);
            // this.cards.push(card);
        }
    }
    ngOnInit() {}
}
