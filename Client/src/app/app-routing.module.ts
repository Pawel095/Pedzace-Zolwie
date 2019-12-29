import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebugViewComponent } from './Controllers/debug-view/debug-view.component';
import { GameControllerComponent } from './Controllers/Game/game-controller/game-controller.component';
import { HomeViewComponent } from './Controllers/Home/home-view/home-view.component';
import { NewGameViewComponent } from './Controllers/Home/new-game-view/new-game-view.component';
import { RulesComponent } from './Controllers/Home/rules/rules.component';
import { LastGameResultsViewComponent } from './Controllers/last-game-results-view/last-game-results-view.component';
import { RefrechCheckGuard } from './Guards/refrech-check.guard';

const routes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'newGame', component: NewGameViewComponent },
    { path: 'lastGameResults', component: LastGameResultsViewComponent },
    {
        path: 'game',
        component: GameControllerComponent,
        canActivate: [RefrechCheckGuard],
    },
    { path: 'debug', component: DebugViewComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'rules', component: RulesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
