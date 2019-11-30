import { Component, OnInit } from '@angular/core';
import { GameModes } from 'src/app/Enums/GameModes';
import { GameStateService } from 'src/app/Servces/game-state.service';

@Component({
    selector: 'app-game-controller',
    templateUrl: './game-controller.component.html',
    styleUrls: ['./game-controller.component.scss'],
})
export class GameControllerComponent implements OnInit {
    constructor(private gss: GameStateService) {}

    ngOnInit() {
        // TYLKO DO DEBUGOWANIA!
        this.gss.setup(GameModes.AI);
    }
}
