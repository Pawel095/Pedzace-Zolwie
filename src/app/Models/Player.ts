import { PlayerTypes } from "../Enums/PlayerTypes";
import { Card } from "./Card";
import { TurtleColours } from "../Enums/TurtleColours";

export class Player {
  playerType: PlayerTypes;
  hand: Array<Card>;
  turtleColour: TurtleColours;
}
