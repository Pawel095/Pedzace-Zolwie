import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../Enums/Events';
import { PlayerTypes } from '../Enums/PlayerTypes';
import { Card } from '../Models/Card';
import { CustomSocket } from '../Models/CustomSocket';
import { GameState } from '../Models/GameState';
import { Move } from '../Models/Move';
import { Player } from '../Models/Player';
import { TurtlePiece } from '../Models/TurtlePiece';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private socket: CustomSocket = undefined;

    private playerBarCardUpdatesSubject = new ReplaySubject<{ id: number; card: Card | null }>();
    public playerBarCardUpdates$ = this.playerBarCardUpdatesSubject.asObservable();

    private currentTurnSubject = new ReplaySubject<number>();
    public currentTurn$ = this.currentTurnSubject.asObservable();

    private mapUpdateSubject = new ReplaySubject<TurtlePiece[]>();
    public mapUpdates$ = this.mapUpdateSubject.asObservable();

    private gameEndStatusSubject = new Subject<GameState>();
    public gameEndStatus$ = this.gameEndStatusSubject.asObservable();

    private gamePreparingSubject = new ReplaySubject<boolean>();
    public gamePreparing$ = this.gamePreparingSubject.asObservable();

    reset() {
        this.socket = undefined;

        this.playerBarCardUpdatesSubject = new ReplaySubject<{ id: number; card: Card | null }>();
        this.playerBarCardUpdates$ = this.playerBarCardUpdatesSubject.asObservable();

        this.currentTurnSubject = new ReplaySubject<number>();
        this.currentTurn$ = this.currentTurnSubject.asObservable();

        this.mapUpdateSubject = new ReplaySubject<TurtlePiece[]>();
        this.mapUpdates$ = this.mapUpdateSubject.asObservable();

        this.gameEndStatusSubject = new Subject<GameState>();
        this.gameEndStatus$ = this.gameEndStatusSubject.asObservable();

        this.gamePreparingSubject = new ReplaySubject<boolean>();
        this.gamePreparing$ = this.gamePreparingSubject.asObservable();
    }

    connect(url: string) {
        this.reset();
        if (this.socket === undefined) {
            this.socket = new CustomSocket({ url });

            this.socket.on(Events.gamepreparingStatus, data => {
                this.gamePreparingSubject.next(data);
                console.log('gamePreparing');
            });

            this.socket.on(Events.playerBarUpdates$, (data: { id: number; card: Card | null }) => {
                this.playerBarCardUpdatesSubject.next(data);
            });

            this.socket.on(Events.currentTurn$, id => {
                this.currentTurnSubject.next(id);
            });

            this.socket.on(Events.mapUpdates$, data => {
                this.mapUpdateSubject.next(data);
            });
            this.socket.on(Events.gameEndStatus$, data => {
                this.gameEndStatusSubject.next(data);
                this.socket.disconnect();
                this.reset();
            });
        }
    }

    getPlayer(type: PlayerTypes, callback: (p: Player, n: number) => void) {
        this.socket.emit(Events.getPlayer, type, callback);
    }

    getInitialPlayerBarData(): Promise<
        { n: number; id: number; type: PlayerTypes; card: undefined; highlighted: boolean; discarded: boolean }[]
    > {
        return new Promise(resolve => {
            this.socket.emit(Events.getInitialPlayerBarData, data => {
                resolve(data);
            });
        });
    }

    getTurtlePositions(): Promise<TurtlePiece[]> {
        return new Promise(resolve => {
            this.socket.emit(Events.getTurtlePositions, data => {
                resolve(data);
            });
        });
    }

    playerMove(m: Move, callback) {
        this.socket.emit(Events.playerMove, m, callback);
    }
}
