import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { Card } from "../Models/Card";
import { TurtleColours } from "../Enums/TurlteColours";
import { CardMarkings } from "../Enums/CardMarkings";

@Component({
  selector: "app-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"]
})
export class CardItemComponent implements OnInit {
  card: Card;
  ctx: CanvasRenderingContext2D;

  @ViewChild("card", { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  background = new Image();
  constructor() {
    this.card = new Card();
    this.card.colour = TurtleColours.BLUE;
    this.card.marking = CardMarkings.COLOUR_ONE_FORWARD;
  }

  ngOnInit() {
    this.background.src = "/assets/Background.png";
    this.ctx = this.canvas.nativeElement.getContext("2d");

    this.background.onload = backgroundOnload => {
      if (this.background.src.length > 0) {
        this.ctx.drawImage(this.background, 0, 0);
      } else {
        console.error('MISSING IMAGE "background.png"');
      }
    };
  }
}
