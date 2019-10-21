import { PlayerTypes } from "../Enums/PlayerTypes";
import { Card } from "./Card";
import { TurtleColours } from "../Enums/TurtleColours";

export class Player {
  playerType: PlayerTypes;
  hand: Array<Card>;
  turtleColour: TurtleColours;
  constructor(type: PlayerTypes, colour: TurtleColours) {
    this.playerType = type;
    this.turtleColour = colour;
  }
}
