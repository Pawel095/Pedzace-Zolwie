import { TurtleColours } from '../Enums/TurtleColours';

export class TurtlePiece {
    colour: TurtleColours;
    mapPosition: number;
    verticalPositon: number;
    constructor(colo: TurtleColours, pos: number, verPos: number) {
        this.colour = colo;
        this.mapPosition = pos;
        this.verticalPositon = verPos;
    }
}
