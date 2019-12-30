import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GameModes } from 'src/app/Enums/GameModes';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { IPlayer } from 'src/app/Interfaces/IPlayer';
import { Card } from 'src/app/Models/Card';
import { Move } from 'src/app/Models/Move';
import { Player } from 'src/app/Models/Player';
import { PlayerInstrance } from 'src/app/Models/PlayerInstance';
import { GameService } from 'src/app/Servces/game.service';
import { environment } from 'src/environments/environment';
import { EndGameDialogComponent } from './end-game-dialog/end-game-dialog.component';
import { SelectColorDialogComponent } from './select-color-dialog/select-color-dialog.component';

@Component({
    selector: 'app-game-controller',
    templateUrl: './game-controller.component.html',
    styleUrls: ['./game-controller.component.scss'],
})
export class GameControllerComponent implements OnInit, IPlayer {
    constructor(
        private gs: GameService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    vsAiAndMpPlayer: Player;
    HotSeatPlayers: PlayerInstrance[];

    currentDisplayPlayer: Player;

    ngOnInit() {
        this.currentDisplayPlayer = new Player(PlayerTypes.HUMAN, TurtleColours.RED);

        // if (!environment.production) {
        //     this.gs.setup(GameModes.MULTIPLAYER);
        // }

        switch (this.gs.currentGamemode) {
            case GameModes.AI:
                this.gs.registerPlayer(this, PlayerTypes.HUMAN);
                this.currentDisplayPlayer = this.vsAiAndMpPlayer;
                break;
            case GameModes.HOT_SEAT:
                this.HotSeatPlayers = [];
                for (let i = 0; i < this.gs.huAmmount; i++) {
                    const p = new PlayerInstrance(this.gs);
                    this.gs.registerPlayer(p, PlayerTypes.HUMAN);
                    this.HotSeatPlayers.push(p);
                }
                this.gs.currentTurn$.subscribe(data => {
                    const playerInstalce = this.HotSeatPlayers.find(e => e.player.id === data);
                    console.log(playerInstalce);
                    if (playerInstalce !== undefined) {
                        this.currentDisplayPlayer = playerInstalce.player;
                    }
                });
                break;
            case GameModes.MULTIPLAYER:
                this.gs.registerPlayer(this, PlayerTypes.HUMAN);
        }

        this.gs.gameEndStatus$.subscribe(data => {
            console.log('Opening Dialog');
            this.dialog
                .open(EndGameDialogComponent, { data })
                .afterClosed()
                .subscribe(() => {
                    this.router.navigateByUrl('/home');
                });
        });
    }

    init(p: Player): void {
        this.vsAiAndMpPlayer = p;
        this.currentDisplayPlayer = undefined;
        this.currentDisplayPlayer = p;
    }

    cardClicked(input: { card: Card; discard: boolean }) {
        console.log(input);
        let player: Player;
        switch (this.gs.currentGamemode) {
            case GameModes.MULTIPLAYER:
            case GameModes.AI:
                player = this.vsAiAndMpPlayer;
                console.log(player);
                break;
            case GameModes.HOT_SEAT:
                player = this.currentDisplayPlayer;
                break;
        }
        if (!input.discard) {
            console.log('playing');
            const card = input.card;
            if (card.colour === TurtleColours.RAINBOW) {
                const dialogRef = this.dialog.open(SelectColorDialogComponent);
                dialogRef.afterClosed().subscribe(data => {
                    if (data !== undefined) {
                        if (this.gs.validateMove(new Move(player.id, card, data))) {
                            if (this.gs.currentGamemode === GameModes.MULTIPLAYER) {
                                this.gs.playerMove(new Move(player.id, card, data), (cards: Card[]) => {
                                    player.cards = cards;
                                    console.log(this);
                                });
                            } else {
                                this.gs.playerMove(new Move(player.id, card, data));
                            }
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
                if (this.gs.validateMove(new Move(player.id, card, card.colour))) {
                    if (this.gs.currentGamemode === GameModes.MULTIPLAYER) {
                        this.gs.playerMove(new Move(player.id, card, card.colour), (cards: Card[]) => {
                            console.log(cards);
                            console.log(player.cards);
                            player.cards = cards;
                        });
                    } else {
                        this.gs.playerMove(new Move(player.id, card, card.colour));
                    }
                } else {
                    this.snackBar.open('You cannot do that!', 'Ok', { duration: 3 * 1000, verticalPosition: 'bottom' });
                }
            }
        } else {
            console.log('discarding');
            if (this.gs.currentGamemode === GameModes.MULTIPLAYER) {
                this.gs.playerMove(new Move(player.id, input.card, input.card.colour, true), (cards: Card[]) => {
                    console.log(cards);
                    console.log(player.cards);
                    player.cards = cards;
                });
            } else {
                this.gs.playerMove(new Move(player.id, input.card, input.card.colour, true));
            }
        }
    }
}
