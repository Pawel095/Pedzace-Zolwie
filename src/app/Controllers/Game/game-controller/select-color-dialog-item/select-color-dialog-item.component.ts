import { Component, Input, OnInit } from '@angular/core';
import { TurtleColours } from 'src/app/Enums/TurtleColours';

@Component({
    selector: 'app-select-color-dialog-item',
    templateUrl: './select-color-dialog-item.component.html',
    styleUrls: ['./select-color-dialog-item.component.scss'],
})
export class SelectColorDialogItemComponent implements OnInit {
    constructor() {}
    @Input() color: TurtleColours;
    src: string;
    name: string;

    turtleBluePath = 'assets/Turtles/Turtle Blue.png';
    turtleGreenPath = 'assets/Turtles/Turtle Green.png';
    turtleRainbowPath = 'assets/Turtles/Turtle Rainbow.png';
    turtleRedPath = 'assets/Turtles/Turtle Red.png';
    turtleVioletPath = 'assets/Turtles/Turtle Violet.png';
    turtleYellowPath = 'assets/Turtles/Turtle Yellow.png';

    ngOnInit() {
        switch (this.color) {
            case TurtleColours.BLUE:
                this.src = this.turtleBluePath;
                this.name = 'Blue';
                break;
            case TurtleColours.RED:
                this.src = this.turtleRedPath;
                this.name = 'Red';
                break;
            case TurtleColours.YELLOW:
                this.src = this.turtleYellowPath;
                this.name = 'Yellow';
                break;
            case TurtleColours.GREEN:
                this.src = this.turtleGreenPath;
                this.name = 'Green';
                break;
            case TurtleColours.VIOLET:
                this.src = this.turtleVioletPath;
                this.name = 'Violet';
                break;
        }
    }
}
