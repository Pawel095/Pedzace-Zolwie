import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainContainterComponent } from "./main-containter/main-containter.component";
import { RulesComponent } from "./rules/rules.component";
import { CardItemComponent } from "./card-item/card-item.component";

const routes: Routes = [
  { path: "home", component: MainContainterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "rules", component: RulesComponent },
  { path: "debug", component: CardItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
