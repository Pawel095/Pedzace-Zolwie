import { CardTypes } from './CardTypes';
import { TurtleColours } from './TurtleColours';

export class Card {
    type: CardTypes;
    colour: TurtleColours;
    constructor(t?: CardTypes, c?: TurtleColours) {
        this.type = t;
        this.colour = c;
    }
    compare(c: Card): boolean {
        return c.colour === this.colour && c.type === this.type;
    }
}
