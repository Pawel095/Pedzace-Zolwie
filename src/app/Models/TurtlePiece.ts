import { TurtleColours } from "../Enums/TurtleColours";

export class TurtlePiece {
    colour: TurtleColours;
    position: number;
    constructor(colo: TurtleColours, pos: number) {
        this.colour = colo;
        this.position = pos;
    }
}
