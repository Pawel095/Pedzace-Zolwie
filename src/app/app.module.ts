import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular//forms";

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
import { NewGameViewComponent } from "./Controllers/new-game-view/new-game-view.component";
import { HomeViewComponent } from "./Controllers/home-view/home-view.component";
import { from } from "rxjs";

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
    PlayerBarComponent,
    NewGameViewComponent,
    HomeViewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
