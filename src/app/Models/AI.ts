import { TurtleColours } from '../Enums/TurtleColours';
import { IPlayer } from '../Interfaces/IPlayer';
import { GameStateService } from '../Servces/game-state.service';
import { Move } from './Move';
import { Player } from './Player';

export class AI implements IPlayer {
    constructor(private gss: GameStateService) {}

    player: Player;

    init(p: Player): void {
        this.player = p;
        this.gss.currentTurn$.subscribe((id: number) => {
            if (id === p.id) {
                // console.log('AI!', p.id);
                // hack for waiting 1 second
                new Promise(res => setTimeout(res, 1000)).then(() => {
                    const move = this.makeMove();
                    this.gss.playerMove(move);
                });
            }
        });
    }

    makeMove(): Move {
        const card = this.player.cards[Math.floor(Math.random() * this.player.cards.length)];
        let ret: Move;
        if (card.colour !== TurtleColours.RAINBOW) {
            ret = new Move(this.player.id, card, card.colour);
        } else {
            const rand = Math.floor(Math.random() * (Object.keys(TurtleColours).length / 2 - 2));
            ret = new Move(this.player.id, card, rand);
        }
        if (this.gss.validateMove(ret)) {
            return ret;
        } else {
            ret.discard = true;
            return ret;
        }
    }
}