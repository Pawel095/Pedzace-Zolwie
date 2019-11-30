import { Card } from './Card';

export class Move {
    playerId: number;
    card: Card;
    constructor(i: number, c: Card) {
        this.playerId = i;
        this.card = c;
    }
}
