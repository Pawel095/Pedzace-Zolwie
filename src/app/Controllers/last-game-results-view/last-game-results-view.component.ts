import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GameStateService } from 'src/app/Servces/game-state.service';
import { EndGameDialogComponent } from '../Game/game-controller/end-game-dialog/end-game-dialog.component';

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
