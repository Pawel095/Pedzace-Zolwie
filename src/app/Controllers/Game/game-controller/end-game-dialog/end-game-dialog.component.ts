import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameState } from 'src/app/Models/GameState';

@Component({
    selector: 'app-end-game-dialog',
    templateUrl: './end-game-dialog.component.html',
    styleUrls: ['./end-game-dialog.component.scss'],
})
export class EndGameDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: GameState) {}
    ngOnInit() {
        console.log(this.data);
    }
}
