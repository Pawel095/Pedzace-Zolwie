import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CardTypes } from '../Enums/CardTypes';
import { GameModes } from '../Enums/GameModes';
import { PlayerTypes } from '../Enums/PlayerTypes';
import { TurtleColours } from '../Enums/TurtleColours';
import { Card } from '../Models/Card';
import { GameState } from '../Models/GameState';
import { Player } from '../Models/Player';
import { TurtlePiece } from '../Models/TurtlePiece';
import { Subject, Observable } from 'rxjs';
import { Move } from '../Models/Move';

// This will be later moved to the server. replacing logic with Socket.io
@Injectable({
    providedIn: 'root',
})
export class GameStateService {
    private gameState: GameState;
    private deck: Array<Card>;

    private playerMovesSubject = new Subject<Move>();
    public playerMoves$: Observable<Move>;

    private mapUpdateSubject = new Subject<TurtlePiece>();
    public mapUpdates$: Observable<TurtlePiece>;

    constructor() {
        this.playerMoves$ = this.playerMovesSubject.asObservable();
        this.mapUpdates$ = this.mapUpdateSubject.asObservable();
    }
    private setupDeck() {
        this.deck = [];
        // coloured cards
        for (let i = 0; i < 5; i++) {
            // move 2
            const card1: Card = new Card();
            card1.colour = i;
            card1.type = CardTypes.COLOUR_TWO_FORWARD;
            this.deck.push(card1);

            // move 1
            for (let j = 0; j < 5; j++) {
                const card2: Card = new Card();
                card2.colour = i;
                card2.type = CardTypes.COLOUR_ONE_FORWARD;
                this.deck.push(card2);
            }

            // move 1 back
            for (let j = 0; j < 2; j++) {
                const card2: Card = new Card();
                card2.colour = i;
                card2.type = CardTypes.COLOUR_ONE_BACK;
                this.deck.push(card2);
            }
        }
        // rainbow cards
        // 2 forward
        for (let i = 0; i < 3; i++) {
            const card1: Card = new Card();
            card1.colour = TurtleColours.RAINBOW;
            card1.type = CardTypes.LAST_TWO_FORWARD;
            this.deck.push(card1);
        }
        // 1 forward
        for (let i = 0; i < 7; i++) {
            const card1: Card = new Card();
            card1.colour = TurtleColours.RAINBOW;
            card1.type = CardTypes.LAST_ONE_FORWARD;
            this.deck.push(card1);
        }
    }

    debugGet0thPlayerId(): number {
        if (!environment.production) {
            return this.gameState.players[0].id;
        }
    }

    // private processMove(m: Move): boolean {
    //     switch (m.card.type) {
    //         case CardTypes.COLOUR_ONE_BACK:
    //             const turtle = this.gameState.turtles.find(e => m.card.colour === e.colour);
    //             if (turtle.mapPosition > 1) {
    //                 return true;
    //             }
    //             break;
    //         case CardTypes.COLOUR_ONE_FORWARD:

    //             break;
    //         case CardTypes.COLOUR_TWO_FORWARD:
    //             break;
    //         case CardTypes.LAST_ONE_FORWARD:
    //             break;
    //         case CardTypes.LAST_TWO_FORWARD:
    //             break;
    //         default:
    //             break;
    //     }
    // }

    playerMove(m: Move) {
        this.playerMovesSubject.next(m);

        this.gameState.turtles[0].mapPosition += 1;
        this.mapUpdateSubject.next(this.gameState.turtles[0]);
    }

    get turtlePositions(): Array<TurtlePiece> {
        return this.gameState.turtles;
    }

    setup(mode: GameModes) {
        this.setupDeck();
        // console.log(this.deck);
        switch (mode) {
            case GameModes.AI:
                const players = Array<Player>();
                const availableTurtleColours = [
                    TurtleColours.RED,
                    TurtleColours.YELLOW,
                    TurtleColours.BLUE,
                    TurtleColours.GREEN,
                    TurtleColours.VIOLET,
                ];
                for (let i = 0; i < 4; i++) {
                    const rand: number = Math.floor(
                        Math.random() * availableTurtleColours.length
                    );
                    const colour: TurtleColours = availableTurtleColours[rand];
                    availableTurtleColours.splice(rand, 1);
                    players.push(new Player(PlayerTypes.AI, colour));
                }
                players.push(
                    new Player(PlayerTypes.HUMAN, availableTurtleColours[0])
                );
                console.log(players);

                const turtles: Array<TurtlePiece> = [];
                for (let i = 0; i < 5; i++) {
                    turtles.push(new TurtlePiece(i, 0, 0));
                }
                this.gameState = new GameState(players, turtles);

                break;
        }
    }
}
