import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameControllerComponent } from './Controllers/Game/game-controller/game-controller.component';
import { HomeViewComponent } from './Controllers/Home/home-view/home-view.component';
import { NewGameViewComponent } from './Controllers/Home/new-game-view/new-game-view.component';
import { RulesComponent } from './Controllers/Home/rules/rules.component';
import { RefrechCheckGuard } from './Guards/refrech-check.guard';
import { SelectColorDialogComponent } from './Controllers/Game/game-controller/select-color-dialog/select-color-dialog.component';

const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'newGame', component: NewGameViewComponent },
    {
        path: 'game',
        component: GameControllerComponent,
        canActivate: [RefrechCheckGuard],
    },
    { path: 'debug', component: SelectColorDialogComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'rules', component: RulesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
