import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../Models/Card';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
    cards: Array<Card> = [];
    @Input() set cardsInput(cards: Array<Card>) {
        console.log(cards);
        this.cards = cards;
    }
    @Output() cardClicked: EventEmitter<Card> = new EventEmitter<Card>();
    onClickCard(card: Card) {
        this.cardClicked.emit(card);
    }
    constructor() {}
    ngOnInit() {}
}
