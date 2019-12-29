import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameModes } from 'src/app/Enums/GameModes';
import { GameService } from 'src/app/Servces/game.service';

@Component({
    selector: 'app-new-game-view',
    templateUrl: './new-game-view.component.html',
    styleUrls: ['./new-game-view.component.scss'],
})
export class NewGameViewComponent implements OnInit {
    constructor(private gss: GameService, private router: Router, private fb: FormBuilder) {}

    form = this.fb.group({
        select: ['', Validators.required],
        huAmmount: [2],
    });

    showHSSlider = false;

    ngOnInit() {
        this.form.valueChanges.subscribe(val => {
            switch (val.select) {
                case 'HS':
                    this.showHSSlider = true;
                    break;

                default:
                    this.showHSSlider = false;
                    break;
            }
        });
    }

    onSubmit() {
        switch (this.form.value.select) {
            case 'AI':
                this.gss.setup(GameModes.AI);
                this.router.navigateByUrl('game');
                break;
            case 'HS':
                this.showHSSlider = false;
                this.gss.setup(GameModes.HOT_SEAT, { hu: this.form.value.huAmmount });
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
