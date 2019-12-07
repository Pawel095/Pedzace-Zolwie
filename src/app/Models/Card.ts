import { CardTypes } from '../Enums/CardTypes';
import { TurtleColours } from '../Enums/TurtleColours';

export class Card {
    type: CardTypes;
    colour: TurtleColours;
    constructor(t?: CardTypes, c?: TurtleColours) {
        this.type = t;
        this.colour = c;
    }
}
