import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainContainterComponent } from "./main-containter/main-containter.component";

const routes: Routes = [
  { path: "home", component: MainContainterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
