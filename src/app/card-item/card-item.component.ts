import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { Card } from "../Models/Card";
import { TurtleColours } from "../Enums/TurtleColours";
import { CardMarkings } from "../Enums/CardMarkings";
import { promise } from "protractor";

@Component({
  selector: "app-card-item",
  templateUrl: "./card-item.component.html",
  styleUrls: ["./card-item.component.scss"]
})
export class CardItemComponent implements OnInit {
  width = 150;
  height = 300;

  backgroundPath = "/assets/Background.png";
  // tslint:disable-next-line: variable-name
  markingC_1Path = "/assets/CardMarkings/C-1.png";
  markingC1Path = "/assets/CardMarkings/C1.png";
  markingC2Path = "/assets/CardMarkings/C2.png";
  markingL1Path = "/assets/CardMarkings/L1.png";
  markingL2Path = "/assets/CardMarkings/L2.png";

  @Input() inputCard: Card;
  card: Card;
  ctx: CanvasRenderingContext2D;
  @ViewChild("card", { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  background = new Image();
  marking = new Image();

  constructor() {}

  ngOnInit() {
    if (this.inputCard === undefined) {
      this.card = new Card();
      this.card.colour = TurtleColours.BLUE;
      this.card.marking = CardMarkings.COLOUR_TWO_FORWARD;
    } else {
      this.card = this.inputCard;
    }
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.ctx.fillRect(0, 0, this.width, this.height);
    const backgroundPromise = new Promise((resolve, reject) => {
      this.background.addEventListener("load", () => {
        resolve(this.background);
      });
      this.background.addEventListener("error", e => {
        reject(e);
      });
      this.background.src = this.backgroundPath;
    });

    const markingPromsie = new Promise((resolve, reject) => {
      this.marking.addEventListener("load", () => {
        resolve(this.marking);
      });
      this.marking.addEventListener("error", e => {
        reject(e);
      });
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
    });
    Promise.all([backgroundPromise, markingPromsie])
      .then(img => {
        this.ctx.drawImage(img[0] as CanvasImageSource, 0, 0);
        this.ctx.drawImage(img[1] as CanvasImageSource, 10, 10);
      })
      .catch(e => console.error(e));
  }
}
