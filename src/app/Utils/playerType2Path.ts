import { Paths } from '../Enums/Paths';
import { PlayerTypes } from '../Enums/PlayerTypes';

export function PlayerType2Path(playerType: PlayerTypes): string {
    switch (playerType) {
        case PlayerTypes.AI:
            return Paths.AI;

        case PlayerTypes.HUMAN:
            return Paths.HU;
    }
}
