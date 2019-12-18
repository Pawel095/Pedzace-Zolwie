import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GameModes } from 'src/app/Enums/GameModes';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { IPlayer } from 'src/app/Interfaces/IPlayer';
import { Card } from 'src/app/Models/Card';
import { Move } from 'src/app/Models/Move';
import { Player } from 'src/app/Models/Player';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { environment } from 'src/environments/environment';
import { SelectColorDialogComponent } from './select-color-dialog/select-color-dialog.component';

@Component({
    selector: 'app-game-controller',
    templateUrl: './game-controller.component.html',
    styleUrls: ['./game-controller.component.scss'],
})
export class GameControllerComponent implements OnInit, IPlayer {
    constructor(private gss: GameStateService, private dialog: MatDialog, private snackBar: MatSnackBar) {}
    player: Player;
    debug = !environment.production;
    ngOnInit() {
        // TODO: usuń debugowanie z tego miejsca
        if (!environment.production) {
            this.gss.setup(GameModes.AI);
        }
        switch (this.gss.currentGamemode) {
            case GameModes.AI:
                this.gss.registerPlayer(this, PlayerTypes.HUMAN);
                break;
        }
    }

    init(p: Player): void {
        this.player = p;
    }

    cardClicked(input: { card: Card; discard: boolean }) {
        console.log(input);
        if (!input.discard) {
            console.log('playing');
            const card = input.card;
            if (card.colour === TurtleColours.RAINBOW) {
                const dialogRef = this.dialog.open(SelectColorDialogComponent);
                dialogRef.afterClosed().subscribe(data => {
                    if (data !== undefined) {
                        if (this.gss.validateMove(new Move(this.player.id, card, data))) {
                            this.gss.playerMove(new Move(this.player.id, card, data));
                        } else {
                            this.snackBar.open('You cannot do that!', 'Ok', {
                                duration: 3 * 1000,
                                verticalPosition: 'bottom',
                            });
                        }
                    } else {
                    }
                });
            } else {
                if (this.gss.validateMove(new Move(this.player.id, card, card.colour))) {
                    this.gss.playerMove(new Move(this.player.id, card, card.colour));
                } else {
                    this.snackBar.open('You cannot do that!', 'Ok', { duration: 3 * 1000, verticalPosition: 'bottom' });
                }
            }
        } else {
            console.log('discarding');
            this.gss.playerMove(new Move(this.player.id, input.card, input.card.colour, true));
        }
    }
}
