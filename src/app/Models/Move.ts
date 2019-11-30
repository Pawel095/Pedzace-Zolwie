import { Card } from './Card';
import { TurtleColours } from '../Enums/TurtleColours';

export class Move {
    playerId: number;
    card: Card;
    selectedTurtleColour: TurtleColours;
    constructor(i: number, c: Card, st: TurtleColours) {
        this.playerId = i;
        this.card = c;
        this.selectedTurtleColour = st;
    }
}
