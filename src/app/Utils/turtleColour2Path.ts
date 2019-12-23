import { Paths } from '../Enums/Paths';
import { TurtleColours } from '../Enums/TurtleColours';

export function TurtleColour2Path(turtle: TurtleColours): string {
    switch (turtle) {
        case TurtleColours.BLUE:
            return Paths.TURTLE_BLUE;

        case TurtleColours.RED:
            return Paths.TURTLE_RED;

        case TurtleColours.YELLOW:
            return Paths.TURTLE_YELLOW;

        case TurtleColours.GREEN:
            return Paths.TURTLE_GREEN;

        case TurtleColours.VIOLET:
            return Paths.TURTLE_VIOLET;

        case TurtleColours.RAINBOW:
            return Paths.TURTLE_RAINBOW;
    }
}
