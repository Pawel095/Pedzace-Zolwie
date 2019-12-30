import { Card } from './Card';
import { PlayerTypes } from './PlayerTypes';
import { TurtleColours } from './TurtleColours';

export class Player {
    id: number;
    playerType: PlayerTypes;
    cards: Array<Card>;
    turtleColour: TurtleColours;
    constructor(type: PlayerTypes, colour: TurtleColours) {
        this.id = Math.floor(Math.random() * 100000);
        this.playerType = type;
        this.turtleColour = colour;
        this.cards = [];
    }
}
