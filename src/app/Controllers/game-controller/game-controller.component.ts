import { Component, OnInit, APP_ID } from '@angular/core';
import { GameModes } from 'src/app/Enums/GameModes';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { Player } from 'src/app/Models/Player';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { Card } from 'src/app/Models/Card';

@Component({
    selector: 'app-game-controller',
    templateUrl: './game-controller.component.html',
    styleUrls: ['./game-controller.component.scss'],
})
export class GameControllerComponent implements OnInit {
    constructor(private gss: GameStateService) {}
    player: Player;

    ngOnInit() {
        // TODO: usuń debugowanie z tego miejsca
        this.gss.setup(GameModes.AI);
        switch (this.gss.currentGamemode) {
            case GameModes.AI:
                this.player = this.gss.getPlayer(PlayerTypes.HUMAN);
                console.log(this.player);
                break;
        }
    }
    cardClicked(card: Card) {
        console.log(card);
    }
}
