import { IPlayer } from '../Interfaces/IPlayer';
import { GameService } from '../Servces/game.service';
import { Move } from './Move';
import { Player } from './Player';

export class PlayerInstrance implements IPlayer {
    constructor(private gs: GameService) {}

    public player: Player;

    init(p: Player): void {
        this.player = p;
    }

    makeMove(m: Move): boolean {
        if (this.gs.validateMove(m)) {
            this.gs.playerMove(m);
            return true;
        } else {
            return false;
        }
    }
}
