import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerTypes } from 'src/app/Enums/PlayerTypes';
import { TurtleColours } from 'src/app/Enums/TurtleColours';
import { GameState } from 'src/app/Models/GameState';
import { Player } from 'src/app/Models/Player';
import { PlayerType2Path } from 'src/app/Utils/playerType2Path';
import { TurtleColour2Path } from 'src/app/Utils/turtleColour2Path';

@Component({
    selector: 'app-end-game-dialog',
    templateUrl: './end-game-dialog.component.html',
    styleUrls: ['./end-game-dialog.component.scss'],
})
export class EndGameDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: GameState) {}
    players: Array<Player> = [];
    results: Array<{
        place: number;
        colourImagePath: string;
        colour: TurtleColours;
        type: PlayerTypes;
        typeImagePath: string;
        number: number;
        id: number;
    }> = [];

    ngOnInit() {
        this.players = this.data.players;
        this.players.forEach((e, i) => {
            this.results.push({
                place: -1,
                colourImagePath: TurtleColour2Path(e.turtleColour),
                colour: e.turtleColour,
                type: e.playerType,
                typeImagePath: PlayerType2Path(e.playerType),
                number: i + 1,
                id: e.id,
            });
        });
        this.results.sort((a, b) => this.compareTurtlePositions(a.colour, b.colour));
        this.results.forEach((e, i) => {
            e.place = i + 1;
        });
    }
    compareTurtlePositions(a: TurtleColours, b: TurtleColours) {
        const turtleA = this.data.turtles.find(e => e.colour === a);
        const turtleB = this.data.turtles.find(e => e.colour === b);
        // More important is the horizontal than vertical.
        // therefore score for horizontal is 100.
        // for vertical: pos 0 = 10 points, -1 per postition
        const scoreA = turtleA.mapPosition * 100 + (10 - turtleA.verticalPositon);
        const scoreB = turtleB.mapPosition * 100 + (10 - turtleB.verticalPositon);
        return scoreB - scoreA;
    }
}
