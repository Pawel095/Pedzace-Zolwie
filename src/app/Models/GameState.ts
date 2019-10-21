import { Player } from "./Player";
import { TurtlePiece } from "./turtlePiece";

export class GameState {
  // wszyscy gracze i pozycje żółwi
  players: Array<Player>;
  turtles: Array<TurtlePiece>;
  constructor(players: Array<Player>, turtles: Array<TurtlePiece>) {
    this.players = players;
    this.turtles = turtles;
  }
}
