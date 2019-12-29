import { PlayerTypes } from '../Enums/PlayerTypes';
import { TurtleColours } from '../Enums/TurtleColours';
import { Card } from './Card';

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
