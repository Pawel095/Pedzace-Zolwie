import { Player } from './Player';
import { TurtlePiece } from './TurtlePiece';

export class GameState {
    players: Array<Player>;
    turtles: Array<TurtlePiece>;
    constructor(players: Array<Player>, turtles: Array<TurtlePiece>) {
        this.players = players;
        this.turtles = turtles;
    }
}
