import { TurtleColours } from '../Enums/TurtleColours';
import { Card } from './Card';

export class Move {
    playerId: number;
    card: Card;
    selectedTurtleColour: TurtleColours;
    constructor(i: number, c: Card, stc: TurtleColours) {
        this.playerId = i;
        this.card = c;
        this.selectedTurtleColour = stc;
    }
}
