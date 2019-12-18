import { Component, OnInit, Input } from '@angular/core';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { Paths } from 'src/app/Enums/Paths';

@Component({
    selector: 'app-player-turtle-view',
    templateUrl: './player-turtle-view.component.html',
    styleUrls: ['./player-turtle-view.component.scss'],
})
export class PlayerTurtleViewComponent {
    src: string;
    alt: string;

    @Input() set colour(colour: TurtleColours) {
        switch (colour) {
            case TurtleColours.BLUE:
                this.src = Paths.TURTLE_BLUE;
                this.alt = 'Blue';
                break;
            case TurtleColours.GREEN:
                this.src = Paths.TURTLE_GREEN;
                this.alt = 'Green';
                break;
            case TurtleColours.RED:
                this.src = Paths.TURTLE_RED;
                this.alt = 'Red';
                break;
            case TurtleColours.VIOLET:
                this.src = Paths.TURTLE_VIOLET;
                this.alt = 'Violet';
                break;
            case TurtleColours.YELLOW:
                this.src = Paths.TURTLE_YELLOW;
                this.alt = 'Yellow';
                break;
            default:
                break;
        }
    }
}
