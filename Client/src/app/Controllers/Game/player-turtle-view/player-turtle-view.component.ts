import { Component, Input, OnInit } from '@angular/core';
import { Paths } from 'src/app/Enums/Paths';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { GameService } from 'src/app/Servces/game.service';
import { GameModes } from 'src/app/Enums/GameModes';
import { InitialPlayerBarData } from 'src/app/Models/InitialPlayerBarData';

@Component({
    selector: 'app-player-turtle-view',
    templateUrl: './player-turtle-view.component.html',
    styleUrls: ['./player-turtle-view.component.scss'],
})
export class PlayerTurtleViewComponent implements OnInit {
    src: string;
    alt: string;
    @Input() number = '0';

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

    constructor(private gs: GameService) {}
    ngOnInit(): void {}
}
