import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RulesComponent } from "./rules/rules.component";
import { CardViewComponent } from "./card-view/card-view.component";
import { GameControllerComponent } from "./game-controller/game-controller.component";

const routes: Routes = [
  { path: "home", component: GameControllerComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "rules", component: RulesComponent }
  // { path: "debug", component: CardViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
