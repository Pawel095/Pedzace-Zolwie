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
  width = 200;
  height = 400;

  backgroundPath = "/assets/Background.png";
  // tslint:disable-next-line: variable-name
  markingC_1Path = "/assets/CardMarkings/C-1.png";
  markingC1Path = "/assets/CardMarkings/C1.png";
  markingC2Path = "/assets/CardMarkings/C2.png";
  markingL1Path = "/assets/CardMarkings/L1.png";
  markingL2Path = "/assets/CardMarkings/L2.png";

  card: Card;
  ctx: CanvasRenderingContext2D;
  @ViewChild("card", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  background = new Image();
  marking = new Image();

  constructor() {
    this.card = new Card();
    this.card.colour = TurtleColours.BLUE;
    this.card.marking = CardMarkings.COLOUR_TWO_FORWARD;
  }

  ngOnInit() {
    this.background.src = this.backgroundPath;
    switch (this.card.marking) {
      case CardMarkings.COLOUR_ONE_BACK:
        this.marking.src = this.markingC_1Path;
        break;
      case CardMarkings.COLOUR_ONE_FORWARD:
        this.marking.src = this.markingC1Path;
        break;
      case CardMarkings.COLOUR_TWO_FORWARD:
        this.marking.src = this.markingC2Path;
        break;
      case CardMarkings.LAST_ONE_FORWARD:
        this.marking.src = this.markingL1Path;
        break;
      case CardMarkings.LAST_TWO_FORWARD:
        this.marking.src = this.markingL2Path;
        break;
    }
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.background.onload = backgroundOnload => {
      if (this.background.src.length > 0) {
        this.ctx.drawImage(this.background, 0, 0);
      } else {
        console.error('MISSING IMAGE "background.png"');
      }
    };

    this.background.onload = MarkingOnLoad => {
      if (this.marking.src.length > 0) {
        this.ctx.drawImage(this.marking, 0, 0);
      } else {
        console.error('MISSING IMAGE "background.png"');
      }
    };
  }
}
