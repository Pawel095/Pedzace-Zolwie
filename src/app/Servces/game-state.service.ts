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
import { ReturnStatement } from '@angular/compiler';

// This will be later moved to the server. replacing logic with Socket.io
@Injectable({
    providedIn: 'root',
})
export class GameStateService {
    private gameState: GameState;
    private deck: Array<Card>;

    private playerMovesSubject = new Subject<Move>();
    public playerMoves$: Observable<Move>;

    private mapUpdateSubject = new Subject<TurtlePiece[]>();
    public mapUpdates$: Observable<TurtlePiece[]>;

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

    public validateMove(m: Move): boolean {
        const turtle = this.gameState.turtles.find(e => {
            if (m.selectedTurtleColour === undefined) {
                return m.card.colour === e.colour;
            } else {
                return m.selectedTurtleColour === e.colour;
            }
        });
        const lastPos = Math.min(
            ...this.gameState.turtles.map(e => e.mapPosition)
        );
        switch (m.card.type) {
            case CardTypes.COLOUR_ONE_BACK:
                if (turtle.mapPosition > 0) {
                    return true;
                } else {
                    return false;
                }
            case CardTypes.COLOUR_ONE_FORWARD:
                if (turtle.mapPosition < 9) {
                    return true;
                } else {
                    return false;
                }
            case CardTypes.COLOUR_TWO_FORWARD:
                if (turtle.mapPosition < 8) {
                    return true;
                } else {
                    return false;
                }
            case CardTypes.LAST_ONE_FORWARD:
                if (turtle.mapPosition < 9 && turtle.mapPosition === lastPos) {
                    return true;
                } else {
                    return false;
                }
            case CardTypes.LAST_TWO_FORWARD:
                if (turtle.mapPosition < 8 && turtle.mapPosition === lastPos) {
                    return true;
                } else {
                    return false;
                }
            default:
                break;
        }
    }

    private processMove(m: Move): TurtlePiece {
        const turtle = this.gameState.turtles.find(e => {
            if (m.selectedTurtleColour === undefined) {
                return m.card.colour === e.colour;
            } else {
                return m.selectedTurtleColour === e.colour;
            }
        });
        switch (m.card.type) {
            case CardTypes.COLOUR_ONE_BACK:
                turtle.mapPosition -= 1;
                break;
            case CardTypes.COLOUR_ONE_FORWARD:
                turtle.mapPosition += 1;
                break;
            case CardTypes.COLOUR_TWO_FORWARD:
                turtle.mapPosition += 2;
                break;
            case CardTypes.LAST_ONE_FORWARD:
                turtle.mapPosition += 1;
                break;
            case CardTypes.LAST_TWO_FORWARD:
                turtle.mapPosition += 2;
                break;

            default:
                break;
        }
        return turtle;
    }

    playerMove(m: Move) {
        const turtle = this.gameState.turtles.find(e => {
            if (m.selectedTurtleColour === undefined) {
                return m.card.colour === e.colour;
            } else {
                return m.selectedTurtleColour === e.colour;
            }
        });
        this.playerMovesSubject.next(m);
        if (this.validateMove(m)) {
            this.processMove(m);
        }

        this.mapUpdateSubject.next(this.gameState.turtles);
    }

    get turtlePositions(): Array<TurtlePiece> {
        return this.gameState.turtles;
    }

    setup(mode: GameModes) {
        this.setupDeck();
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
