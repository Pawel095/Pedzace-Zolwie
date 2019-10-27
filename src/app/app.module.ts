import { FormsModule } from "@angular//forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardItemComponent } from "./Controllers/card-item/card-item.component";
import { CardViewComponent } from "./Controllers/card-view/card-view.component";
import { GameControllerComponent } from "./Controllers/game-controller/game-controller.component";
import { HomeViewComponent } from "./Controllers/home-view/home-view.component";
import { MapViewComponent } from "./Controllers/map-view/map-view.component";
import { NavBarComponent } from "./Controllers/nav-bar/nav-bar.component";
import { NewGameViewComponent } from "./Controllers/new-game-view/new-game-view.component";
import { PlayerBarComponent } from "./Controllers/player-bar/player-bar.component";
import { RulesComponent } from "./Controllers/rules/rules.component";
import { ScoreboardComponent } from "./Controllers/scoreboard/scoreboard.component";
import { DebugComponent } from "./debug/debug.component";

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
        HomeViewComponent,
        DebugComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
