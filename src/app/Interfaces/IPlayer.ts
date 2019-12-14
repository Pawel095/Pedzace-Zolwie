import { Card } from '../Models/Card';
import { Move } from '../Models/Move';
import { Player } from '../Models/Player';

export interface IPlayer {
    init(p: Player): void;
}
