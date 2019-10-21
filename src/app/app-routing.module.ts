import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RulesComponent } from "./Controllers/rules/rules.component";
import { CardViewComponent } from "./Controllers/card-view/card-view.component";
import { GameControllerComponent } from "./Controllers/game-controller/game-controller.component";
import { HomeViewComponent } from "./Controllers/home-view/home-view.component";
import { NewGameViewComponent } from "./Controllers/new-game-view/new-game-view.component";

const routes: Routes = [
  { path: "home", component: HomeViewComponent },
  { path: "newGame", component: NewGameViewComponent },
  { path: "game", component: GameControllerComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "rules", component: RulesComponent }
  // { path: "debug", component: CardViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
