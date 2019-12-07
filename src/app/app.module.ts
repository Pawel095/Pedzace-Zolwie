import { FormsModule } from '@angular//forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardItemComponent } from './Controllers/Cards/card-item/card-item.component';
import { CardViewComponent } from './Controllers/Cards/card-view/card-view.component';
import { DebugComponent } from './Controllers/debug/debug.component';
import { GameControllerComponent } from './Controllers/Game/game-controller/game-controller.component';
import { MapViewComponent } from './Controllers/Game/map-view/map-view.component';
import { PlayerBarItemComponent } from './Controllers/Game/player-bar-item/player-bar-item.component';
import { PlayerBarComponent } from './Controllers/Game/player-bar/player-bar.component';
import { HomeViewComponent } from './Controllers/Home/home-view/home-view.component';
import { NewGameViewComponent } from './Controllers/Home/new-game-view/new-game-view.component';
import { RulesComponent } from './Controllers/Home/rules/rules.component';
import { ScoreboardComponent } from './Controllers/Home/scoreboard/scoreboard.component';
import { NavBarComponent } from './Controllers/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

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
        DebugComponent,
        PlayerBarItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
