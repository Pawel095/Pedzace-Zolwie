import { Component, OnInit } from '@angular/core';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { MatDialog } from '@angular/material/dialog';
import { EndGameDialogComponent } from '../Game/game-controller/end-game-dialog/end-game-dialog.component';
import { GameState } from 'src/app/Models/GameState';
import { Router } from '@angular/router';

@Component({
    selector: 'app-last-game-results-view',
    templateUrl: './last-game-results-view.component.html',
    styleUrls: ['./last-game-results-view.component.scss'],
})
export class LastGameResultsViewComponent implements OnInit {
    constructor(private gss: GameStateService, private dialog: MatDialog, private router: Router) {}
    dataAvailable = false;
    ngOnInit() {
        this.gss.gameEndStatus$.subscribe(data => {
            this.dataAvailable = true;
            this.dialog
                .open(EndGameDialogComponent, { data })
                .afterClosed()
                .subscribe(() => {
                    this.router.navigateByUrl('/home');
                });
        });
    }
}
