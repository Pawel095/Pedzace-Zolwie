import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameControllerComponent } from './Controllers/game-controller/game-controller.component';
import { HomeViewComponent } from './Controllers/home-view/home-view.component';
import { NewGameViewComponent } from './Controllers/new-game-view/new-game-view.component';
import { RulesComponent } from './Controllers/rules/rules.component';
import { RefrechCheckGuard } from './Guards/refrech-check.guard';

const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'newGame', component: NewGameViewComponent },
    {
        path: 'game',
        component: GameControllerComponent,
        canActivate: [RefrechCheckGuard],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'rules', component: RulesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
