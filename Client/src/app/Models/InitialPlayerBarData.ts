import { PlayerTypes } from '../Enums/PlayerTypes';
import { Card } from './Card';

export interface InitialPlayerBarData {
    n: number;
    id: number;
    type: PlayerTypes;
    card: Card | undefined;
    highlighted: boolean;
    discarded: boolean;
}
