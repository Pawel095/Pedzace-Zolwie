import { PlayerTypes } from "../Enums/PlayerTypes";
import { TurtleColours } from "../Enums/TurtleColours";
import { Card } from "./Card";

export class Player {
    readonly id: number;
    playerType: PlayerTypes;
    hand: Array<Card>;
    turtleColour: TurtleColours;
    constructor(type: PlayerTypes, colour: TurtleColours) {
        this.id = Math.floor(Math.random() * 10000);
        this.playerType = type;
        this.turtleColour = colour;
    }
}
