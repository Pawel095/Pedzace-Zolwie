import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./Controllers/nav-bar/nav-bar.component";
import { MapViewComponent } from "./Controllers/map-view/map-view.component";
import { CardViewComponent } from "./Controllers/card-view/card-view.component";
import { ScoreboardComponent } from "./Controllers/scoreboard/scoreboard.component";
import { RulesComponent } from "./Controllers/rules/rules.component";
import { CardItemComponent } from "./Controllers/card-item/card-item.component";
import { GameControllerComponent } from "./Controllers/game-controller/game-controller.component";
import { PlayerBarComponent } from "./Controllers/player-bar/player-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MapViewComponent,
    CardViewComponent,
    ScoreboardComponent,
    RulesComponent,
    CardItemComponent,
    GameControllerComponent,
    PlayerBarComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
