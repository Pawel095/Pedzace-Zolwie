import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { reject } from 'q';
import { CardTypes } from '../../../Enums/CardTypes';
import { TurtleColours } from '../../../Enums/TurtleColours';
import { Card } from '../../../Models/Card';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
    width = 150;
    height = 300;
    canvasWidth = this.width;
    canvasHeight = this.height;
    @Input() scale = 1;

    backgroundPath = 'assets/Background.png';
    // tslint:disable-next-line: variable-name
    markingC_1Path = 'assets/CardMarkings/C-1.png';
    markingC1Path = 'assets/CardMarkings/C1.png';
    markingC2Path = 'assets/CardMarkings/C2.png';
    markingL1Path = 'assets/CardMarkings/L1.png';
    markingL2Path = 'assets/CardMarkings/L2.png';

    turtleBluePath = 'assets/Turtles/Turtle Blue.png';
    turtleGreenPath = 'assets/Turtles/Turtle Green.png';
    turtleRainbowPath = 'assets/Turtles/Turtle Rainbow.png';
    turtleRedPath = 'assets/Turtles/Turtle Red.png';
    turtleVioletPath = 'assets/Turtles/Turtle Violet.png';
    turtleYellowPath = 'assets/Turtles/Turtle Yellow.png';

    @Input() set inputCard(c: Card) {
        this.card = c;
        this.ngOnInit();
    }
    @Output() cardClicked: EventEmitter<Card> = new EventEmitter<Card>();
    card: Card;
    ctx: CanvasRenderingContext2D;
    @ViewChild('card', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    background = new Image();
    marking = new Image();
    turtle = new Image();

    constructor() {}

    ngOnInit() {
        if (this.card === undefined) {
            this.card = new Card();
            this.card.colour = TurtleColours.BLUE;
            this.card.type = CardTypes.COLOUR_TWO_FORWARD;
        }

        this.canvasWidth = this.width * this.scale;
        this.canvasHeight = this.height * this.scale;

        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx.fillRect(0, 0, this.width, this.height);
        const backgroundPromise = new Promise(resolve => {
            this.background.addEventListener('load', () => {
                resolve(this.background);
            });
            this.background.addEventListener('error', e => {
                reject(e);
            });
            this.background.src = this.backgroundPath;
        });

        const markingPromsie = new Promise(resolve => {
            this.marking.addEventListener('load', () => {
                resolve(this.marking);
            });
            this.marking.addEventListener('error', e => {
                reject(e);
            });
            switch (this.card.type) {
                case CardTypes.COLOUR_ONE_BACK:
                    this.marking.src = this.markingC_1Path;
                    break;
                case CardTypes.COLOUR_ONE_FORWARD:
                    this.marking.src = this.markingC1Path;
                    break;
                case CardTypes.COLOUR_TWO_FORWARD:
                    this.marking.src = this.markingC2Path;
                    break;
                case CardTypes.LAST_ONE_FORWARD:
                    this.marking.src = this.markingL1Path;
                    break;
                case CardTypes.LAST_TWO_FORWARD:
                    this.marking.src = this.markingL2Path;
                    break;
            }
        });

        const TurtlePromise = new Promise(resolve => {
            this.turtle.addEventListener('load', () => {
                resolve(this.turtle);
            });
            this.turtle.addEventListener('error', e => {
                reject(e);
            });

            // turtle
            switch (this.card.colour) {
                case TurtleColours.BLUE:
                    this.turtle.src = this.turtleBluePath;
                    break;
                case TurtleColours.RED:
                    this.turtle.src = this.turtleRedPath;
                    break;
                case TurtleColours.YELLOW:
                    this.turtle.src = this.turtleYellowPath;
                    break;
                case TurtleColours.GREEN:
                    this.turtle.src = this.turtleGreenPath;
                    break;
                case TurtleColours.VIOLET:
                    this.turtle.src = this.turtleVioletPath;
                    break;
                case TurtleColours.RAINBOW:
                    this.turtle.src = this.turtleRainbowPath;
                    break;
            }
        });

        Promise.all([backgroundPromise, markingPromsie, TurtlePromise])
            .then(img => {
                // background
                this.ctx.drawImage(img[0] as CanvasImageSource, 0, 0, this.canvasWidth, this.canvasHeight);
                // marking top left
                this.ctx.drawImage(
                    img[1] as CanvasImageSource,
                    5 * this.scale,
                    5 * this.scale,
                    34 * this.scale,
                    75 * this.scale
                );
                // marking top right
                this.ctx.drawImage(
                    img[1] as CanvasImageSource,
                    (this.width - 40) * this.scale,
                    5 * this.scale,
                    34 * this.scale,
                    75 * this.scale
                );
                // turtle
                this.ctx.drawImage(img[2] as CanvasImageSource, 0, 50 * this.scale, 150 * this.scale, 300 * this.scale);
            })
            .catch(e => console.error(e));
    }

    onClick() {
        this.cardClicked.emit(this.card);
    }
}
