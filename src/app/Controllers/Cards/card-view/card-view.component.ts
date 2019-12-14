import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardTypes } from 'src/app/Enums/CardTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { Card } from '../../../Models/Card';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
    cards: Array<Card> = [];
    @Input() set cardsInput(cards: Array<Card>) {
        this.cards = cards;
        // this.cards.push(
        //     new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RAINBOW)
        // );
        // this.cards.push(
        //     new Card(CardTypes.COLOUR_ONE_FORWARD, TurtleColours.RAINBOW)
        // );
        // this.cards.push(
        //     new Card(CardTypes.COLOUR_TWO_FORWARD, TurtleColours.RAINBOW)
        // );
        // this.cards.push(
        //     new Card(CardTypes.LAST_ONE_FORWARD, TurtleColours.RAINBOW)
        // );
        // this.cards.push(
        //     new Card(CardTypes.LAST_TWO_FORWARD, TurtleColours.RAINBOW)
        // );
        // this.cards.push(new Card(CardTypes.COLOUR_ONE_BACK, TurtleColours.RED));
        // this.cards.push(new Card(CardTypes.COLOUR_ONE_FORWARD, TurtleColours.BLUE));
        // this.cards.push(new Card(CardTypes.COLOUR_TWO_FORWARD, TurtleColours.GREEN));
        // this.cards.push(new Card(CardTypes.LAST_ONE_FORWARD, TurtleColours.RAINBOW));
        // this.cards.push(new Card(CardTypes.LAST_TWO_FORWARD, TurtleColours.RAINBOW));
    }
    @Output() cardClicked: EventEmitter<Card> = new EventEmitter<Card>();
    onClickCard(card: Card) {
        this.cardClicked.emit(card);
    }
    constructor() {}
    ngOnInit() {}
}
