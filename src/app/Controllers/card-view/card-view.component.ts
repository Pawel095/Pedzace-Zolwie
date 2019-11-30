import { Component, OnInit } from '@angular/core';
import { Card } from '../../Models/Card';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss'],
})
export class CardViewComponent implements OnInit {
    cards: Array<Card> = [];
    constructor() {}
    ngOnInit() {}
}
