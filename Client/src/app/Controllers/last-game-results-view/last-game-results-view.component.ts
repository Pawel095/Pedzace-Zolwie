import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameState } from 'src/app/Models/GameState';
import { GameService } from 'src/app/Servces/game.service';
import { EndGameDialogComponent } from '../Game/game-controller/end-game-dialog/end-game-dialog.component';

@Component({
    selector: 'app-last-game-results-view',
    templateUrl: './last-game-results-view.component.html',
    styleUrls: ['./last-game-results-view.component.scss'],
})
export class LastGameResultsViewComponent implements OnInit {
    constructor(private gss: GameService, private dialog: MatDialog, private router: Router) {}
    data: GameState;
    dataAvailable = false;
    ngOnInit() {
        if (this.gss.lastGameResult !== null) {
            this.dataAvailable = true;
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
