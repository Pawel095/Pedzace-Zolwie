import { PlayerTypes } from "../Enums/PlayerTypes";
import { TurtleColours } from "../Enums/TurtleColours";
import { Card } from "./Card";

export class Player {
    playerType: PlayerTypes;
    hand: Array<Card>;
    turtleColour: TurtleColours;
    constructor(type: PlayerTypes, colour: TurtleColours) {
        this.playerType = type;
        this.turtleColour = colour;
    }
}
