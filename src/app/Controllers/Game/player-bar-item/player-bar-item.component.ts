import { Component, OnInit, Input } from '@angular/core';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';

@Component({
    selector: 'app-player-bar-item',
    templateUrl: './player-bar-item.component.html',
    styleUrls: ['./player-bar-item.component.scss'],
})
export class PlayerBarItemComponent implements OnInit {
    constructor() {}
    @Input() number: number;
    @Input() type: PlayerTypes;
    @Input() card: Card;
    @Input() highlight: boolean;

    imgSrc = '';
    alt = '';

    aiPath = 'assets/Icons/AI.png';
    huPath = 'assets/Icons/Human.png';
    ngOnInit() {
        switch (this.type) {
            case PlayerTypes.AI:
                this.imgSrc = this.aiPath;
                this.alt = 'AI';
                break;
            case PlayerTypes.HUMAN:
                this.imgSrc = this.huPath;
                this.alt = 'HUMAN';
                break;
            default:
                break;
        }
    }
}
