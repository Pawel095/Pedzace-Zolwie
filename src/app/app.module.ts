import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { MapViewComponent } from "./map-view/map-view.component";
import { CardViewComponent } from "./card-view/card-view.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { RulesComponent } from "./rules/rules.component";
import { MainContainterComponent } from "./main-containter/main-containter.component";
import { CardItemComponent } from "./card-item/card-item.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MapViewComponent,
    CardViewComponent,
    ScoreboardComponent,
    RulesComponent,
    MainContainterComponent,
    CardItemComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
