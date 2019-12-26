import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { EndGameDialogComponent } from '../Game/game-controller/end-game-dialog/end-game-dialog.component';
import { GameState } from 'src/app/Models/GameState';

@Component({
    selector: 'app-last-game-results-view',
    templateUrl: './last-game-results-view.component.html',
    styleUrls: ['./last-game-results-view.component.scss'],
})
export class LastGameResultsViewComponent implements OnInit {
    constructor(private gss: GameStateService, private dialog: MatDialog, private router: Router) {}
    data: GameState;
    ngOnInit() {
        if (this.gss.lastGameResult !== null) {
            this.data = this.gss.lastGameResult;
            this.dialog
                .open(EndGameDialogComponent, { data: this.data })
                .afterClosed()
                .subscribe(() => {
                    this.router.navigateByUrl('/home');
                });
        }
    }
}
