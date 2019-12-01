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
import shuffle from '../Utils/shuffle';

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

    private wasSetupRunV = false;
    constructor() {
        this.playerMoves$ = this.playerMovesSubject.asObservable();
        this.mapUpdates$ = this.mapUpdateSubject.asObservable();
    }

    get turtlePositions(): Array<TurtlePiece> {
        return this.gameState.turtles;
    }

    get wasSetupRun() {
        return this.wasSetupRun;
    }

    debugGet0thPlayerId(): number {
        if (!environment.production) {
            return this.gameState.players[0].id;
        }
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
        this.deck = shuffle(this.deck);
    }

    private dealCard(player: Player, ammount: number = 1) {
        for (let i = 0; i < ammount; i++) {
            const card: Card = this.deck.pop();
            player.hand.push(card);
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
                if (turtle.mapPosition > 1) {
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

    private processMove(m: Move) {
        const cardTurtle = this.gameState.turtles.find(e => {
            if (m.selectedTurtleColour === undefined) {
                return m.card.colour === e.colour;
            } else {
                return m.selectedTurtleColour === e.colour;
            }
        });

        const turtlesOnTop = this.gameState.turtles.filter(
            e =>
                cardTurtle.mapPosition === e.mapPosition &&
                e.verticalPositon > cardTurtle.verticalPositon
        );
        const turtlesToAlter = [cardTurtle, ...turtlesOnTop];

        let turtlesOnTargetTile: TurtlePiece[];
        switch (m.card.type) {
            case CardTypes.COLOUR_ONE_BACK:
                turtlesOnTargetTile = this.gameState.turtles.filter(
                    e => e.mapPosition === cardTurtle.mapPosition - 1
                );
                turtlesToAlter.forEach(e => {
                    e.mapPosition -= 1;
                });
                break;
            case CardTypes.COLOUR_ONE_FORWARD:
                turtlesOnTargetTile = this.gameState.turtles.filter(
                    e => e.mapPosition === cardTurtle.mapPosition + 1
                );
                turtlesToAlter.forEach(e => {
                    e.mapPosition += 1;
                });
                break;
            case CardTypes.COLOUR_TWO_FORWARD:
                turtlesOnTargetTile = this.gameState.turtles.filter(
                    e => e.mapPosition === cardTurtle.mapPosition + 2
                );
                turtlesToAlter.forEach(e => {
                    e.mapPosition += 2;
                });
                break;
            case CardTypes.LAST_ONE_FORWARD:
                turtlesOnTargetTile = this.gameState.turtles.filter(
                    e => e.mapPosition === cardTurtle.mapPosition + 1
                );
                turtlesToAlter.forEach(e => {
                    e.mapPosition += 1;
                });
                break;
            case CardTypes.LAST_TWO_FORWARD:
                turtlesOnTargetTile = this.gameState.turtles.filter(
                    e => e.mapPosition === cardTurtle.mapPosition + 2
                );
                turtlesToAlter.forEach(e => {
                    e.mapPosition += 2;
                });
                break;
            default:
                break;
        }
        console.log(turtlesOnTargetTile);
        // jeżeli nie ma innych żółwi na polu
        if (turtlesOnTargetTile.length <= 0) {
            const turtles = this.gameState.turtles.filter(
                e => e.mapPosition === cardTurtle.mapPosition
            );
            const min = Math.min(...turtles.map(e => e.verticalPositon));
            turtles.forEach(e => {
                e.verticalPositon -= min;
            });
        } else {
            const verticalPos = Math.max(
                ...turtlesOnTargetTile.map(e => e.verticalPositon)
            );
            const min = Math.min(...turtlesToAlter.map(e => e.verticalPositon));
            turtlesToAlter.forEach(e => {
                e.verticalPositon -= min;
                e.verticalPositon += verticalPos + 1;
            });
            console.log(turtlesToAlter);
        }
    }

    public playerMove(m: Move) {
        this.playerMovesSubject.next(m);
        if (this.validateMove(m)) {
            this.processMove(m);
        }
        console.log(this.gameState.turtles.map(e => e.verticalPositon));
        this.mapUpdateSubject.next(this.gameState.turtles);
    }

    public setup(mode: GameModes) {
        this.wasSetupRunV = true;
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
                    const colour: TurtleColours = availableTurtleColours.splice(
                        rand,
                        1
                    )[0];
                    players.push(new Player(PlayerTypes.AI, colour));
                }
                players.push(
                    new Player(PlayerTypes.HUMAN, availableTurtleColours[0])
                );

                players.forEach(e => this.dealCard(e, 5));

                const turtles: Array<TurtlePiece> = [];
                for (let i = 0; i < 5; i++) {
                    turtles.push(new TurtlePiece(i, 1, i));
                }

                console.log(players);
                console.log(turtles);
                this.gameState = new GameState(players, turtles);
                break;
        }
    }
}
