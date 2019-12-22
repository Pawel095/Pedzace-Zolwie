import { FormsModule } from '@angular//forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardItemComponent } from './Controllers/Cards/card-item/card-item.component';
import { CardViewComponent } from './Controllers/Cards/card-view/card-view.component';
import { DebugComponent } from './Controllers/debug/debug.component';
import { GameControllerComponent } from './Controllers/Game/game-controller/game-controller.component';
// tslint:disable-next-line: max-line-length
import { SelectColorDialogItemComponent } from './Controllers/Game/game-controller/select-color-dialog-item/select-color-dialog-item.component';
import { SelectColorDialogComponent } from './Controllers/Game/game-controller/select-color-dialog/select-color-dialog.component';
import { MapViewComponent } from './Controllers/Game/map-view/map-view.component';
import { PlayerBarItemComponent } from './Controllers/Game/player-bar-item/player-bar-item.component';
import { PlayerBarComponent } from './Controllers/Game/player-bar/player-bar.component';
import { HomeViewComponent } from './Controllers/Home/home-view/home-view.component';
import { NewGameViewComponent } from './Controllers/Home/new-game-view/new-game-view.component';
import { RulesComponent } from './Controllers/Home/rules/rules.component';
import { NavBarComponent } from './Controllers/nav-bar/nav-bar.component';
import { PlayerTurtleViewComponent } from './Controllers/Game/player-turtle-view/player-turtle-view.component';
import { EndGameDialogComponent } from './Controllers/Game/game-controller/end-game-dialog/end-game-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        MapViewComponent,
        CardViewComponent,
        RulesComponent,
        CardItemComponent,
        GameControllerComponent,
        PlayerBarComponent,
        NewGameViewComponent,
        HomeViewComponent,
        DebugComponent,
        PlayerBarItemComponent,
        SelectColorDialogComponent,
        SelectColorDialogItemComponent,
        PlayerTurtleViewComponent,
        EndGameDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatRadioModule,
        MatDialogModule,
        MatRippleModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatGridListModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [SelectColorDialogComponent, SelectColorDialogItemComponent, EndGameDialogComponent],
})
export class AppModule {}
