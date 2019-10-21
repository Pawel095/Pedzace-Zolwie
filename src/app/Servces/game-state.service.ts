import { Injectable } from "@angular/core";
import { GameState } from "../Models/GameState";
import { GameModes } from "../Enums/GameModes";
import { Player } from "../Models/Player";
import { PlayerTypes } from "../Enums/PlayerTypes";
import { TurtleColours } from "../Enums/TurtleColours";
import { Card } from "../Models/Card";
import { CardMarkings } from "../Enums/CardMarkings";
import { convertUpdateArguments } from "@angular/compiler/src/compiler_util/expression_converter";
import { TurtlePiece } from "../Models/turtlePiece";

// This will be later moved to the server. replacing logic with Socket.io
@Injectable({
  providedIn: "root"
})
export class GameStateService {
  private gameState: GameState;
  private deck: Array<Card>;
  constructor() {}

  private setupDeck() {
    this.deck = [];
    // coloured cards
    for (let i = 0; i < 5; i++) {
      // move 2
      const card1: Card = new Card();
      card1.colour = i;
      card1.marking = CardMarkings.COLOUR_TWO_FORWARD;
      this.deck.push(card1);

      // move 1
      for (let j = 0; j < 5; j++) {
        const card2: Card = new Card();
        card2.colour = i;
        card2.marking = CardMarkings.COLOUR_ONE_FORWARD;
        this.deck.push(card2);
      }

      // move 1 back
      for (let j = 0; j < 2; j++) {
        const card2: Card = new Card();
        card2.colour = i;
        card2.marking = CardMarkings.COLOUR_ONE_BACK;
        this.deck.push(card2);
      }
    }
    // rainbow cards
    // 2 forward
    for (let i = 0; i < 3; i++) {
      const card1: Card = new Card();
      card1.colour = TurtleColours.RAINBOW;
      card1.marking = CardMarkings.LAST_TWO_FORWARD;
      this.deck.push(card1);
    }
    // 1 forward
    for (let i = 0; i < 7; i++) {
      const card1: Card = new Card();
      card1.colour = TurtleColours.RAINBOW;
      card1.marking = CardMarkings.LAST_ONE_FORWARD;
      this.deck.push(card1);
    }
  }

  private dealCards() {}

  setup(mode: GameModes) {
    this.setupDeck();
    // console.log(this.deck);
    switch (mode) {
      case GameModes.AI:
        const players = Array<Player>();
        const availableTurtleColours = [
          TurtleColours.RED,
          TurtleColours.YELLOW,
          TurtleColours.BLUE,
          TurtleColours.GREEN,
          TurtleColours.VIOLET
        ];
        for (let i = 0; i < 4; i++) {
          const rand: number = Math.floor(
            Math.random() * availableTurtleColours.length
          );
          const colour: TurtleColours = availableTurtleColours[rand];
          availableTurtleColours.splice(rand, 1);
          players.push(new Player(PlayerTypes.AI, colour));
        }
        players.push(new Player(PlayerTypes.HUMAN, availableTurtleColours[0]));
        console.log(players);
        const turtles: Array<TurtlePiece> = [];
        for (let i = 0; i < 5; i++) {
          turtles.push(new TurtlePiece(i, 0));
        }
        this.gameState = new GameState(players, turtles);
        break;
    }
  }
}
