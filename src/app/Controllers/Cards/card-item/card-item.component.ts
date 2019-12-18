import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { reject } from 'q';
import { CardTypes } from '../../../Enums/CardTypes';
import { TurtleColours } from '../../../Enums/TurtleColours';
import { Card } from '../../../Models/Card';
import { Paths } from 'src/app/Enums/Paths';

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
            this.background.src = Paths.BACKGROUND;
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
                    this.marking.src = Paths.MARKING_C_1;
                    break;
                case CardTypes.COLOUR_ONE_FORWARD:
                    this.marking.src = Paths.MARKING_C1;
                    break;
                case CardTypes.COLOUR_TWO_FORWARD:
                    this.marking.src = Paths.MARKING_C2;
                    break;
                case CardTypes.LAST_ONE_FORWARD:
                    this.marking.src = Paths.MARKING_L1;
                    break;
                case CardTypes.LAST_TWO_FORWARD:
                    this.marking.src = Paths.MARKING_L2;
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
                    this.turtle.src = Paths.TURTLE_BLUE;
                    break;
                case TurtleColours.RED:
                    this.turtle.src = Paths.TURTLE_RED;
                    break;
                case TurtleColours.YELLOW:
                    this.turtle.src = Paths.TURTLE_YELLOW;
                    break;
                case TurtleColours.GREEN:
                    this.turtle.src = Paths.TURTLE_GREEN;
                    break;
                case TurtleColours.VIOLET:
                    this.turtle.src = Paths.TURTLE_VIOLET;
                    break;
                case TurtleColours.RAINBOW:
                    this.turtle.src = Paths.TURTLE_RAINBOW;
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
