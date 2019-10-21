import { Injectable } from "@angular/core";
import { GameState } from "../Models/GameState";

@Injectable({
  providedIn: "root"
})
export class GameStateService {
  private gameState: GameState;
  constructor() {}
}
