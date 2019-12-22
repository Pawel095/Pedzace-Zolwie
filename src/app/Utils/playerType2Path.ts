import { PlayerTypes } from '../Enums/PlayerTypes';
import { Paths } from '../Enums/Paths';

export function PlayerType2Path(playerType: PlayerTypes): string {
    switch (playerType) {
        case PlayerTypes.AI:
            return Paths.AI;

        case PlayerTypes.HUMAN:
            return Paths.HU;
    }
}
