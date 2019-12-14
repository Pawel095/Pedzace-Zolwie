import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameModes } from 'src/app/Enums/GameModes';
import { GameStateService } from 'src/app/Servces/game-state.service';

@Component({
    selector: 'app-new-game-view',
    templateUrl: './new-game-view.component.html',
    styleUrls: ['./new-game-view.component.scss'],
})
export class NewGameViewComponent implements OnInit {
    constructor(private gss: GameStateService, private router: Router, private fb: FormBuilder) {}

    form = this.fb.group({
        select: ['', Validators.required],
    });

    ngOnInit() {}

    onSubmit() {
        switch (this.form.value.select) {
            case 'AI':
                this.gss.setup(GameModes.AI);
                this.router.navigateByUrl('game');
                break;
            case 'HS':
                this.router.navigateByUrl('game');
                break;
            case 'MP':
                this.router.navigateByUrl('game');
                break;
            default:
                console.log('badSelectionMade!');
        }
    }
}
