import { Component, Input, OnInit } from '@angular/core';
import { Paths } from 'src/app/Enums/Paths';
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

    ngOnInit() {
        switch (this.color) {
            case TurtleColours.BLUE:
                this.src = Paths.TURTLE_BLUE;
                this.name = 'Blue';
                break;
            case TurtleColours.RED:
                this.src = Paths.TURTLE_RED;
                this.name = 'Red';
                break;
            case TurtleColours.YELLOW:
                this.src = Paths.TURTLE_YELLOW;
                this.name = 'Yellow';
                break;
            case TurtleColours.GREEN:
                this.src = Paths.TURTLE_GREEN;
                this.name = 'Green';
                break;
            case TurtleColours.VIOLET:
                this.src = Paths.TURTLE_VIOLET;
                this.name = 'Violet';
                break;
        }
    }
}
