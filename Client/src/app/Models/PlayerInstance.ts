import { IPlayer } from '../Interfaces/IPlayer';
import { GameService } from '../Servces/game.service';
import { Move } from './Move';
import { Player } from './Player';

export class PlayerInstrance implements IPlayer {
    constructor(private gss: GameService) {}

    public player: Player;

    init(p: Player): void {
        this.player = p;
    }

    makeMove(m: Move): boolean {
        if (this.gss.validateMove(m)) {
            this.gss.playerMove(m);
            return true;
        } else {
            return false;
        }
    }
}
