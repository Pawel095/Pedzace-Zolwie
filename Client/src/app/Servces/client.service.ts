import { Injectable } from '@angular/core';
import { Events } from '../Enums/Events';
import { PlayerTypes } from '../Enums/PlayerTypes';
import { CustomSocket } from '../Models/CustomSocket';
import { Player } from '../Models/Player';
import { TurtlePiece } from '../Models/TurtlePiece';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { Card } from '../Models/Card';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { Move } from '../Models/Move';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    socket: CustomSocket;

    private playerBarCardUpdatesSubject = new ReplaySubject<{ id: number; card: Card | null }>();
    public playerBarCardUpdates$ = this.playerBarCardUpdatesSubject.asObservable();

    private currentTurnSubject = new ReplaySubject<number>();
    public currentTurn$ = this.currentTurnSubject.asObservable();

    private mapUpdateSubject = new ReplaySubject<TurtlePiece[]>();
    public mapUpdates$ = this.mapUpdateSubject.asObservable();

    debug() {
        if (!environment.production) {
            this.socket.emit('debug');
        }
    }

    connect() {
        this.socket = new CustomSocket('http://localhost:1234');
        this.socket.on(Events.playerBarUpdates$, (data: { id: number; card: Card | null }) => {
            this.playerBarCardUpdatesSubject.next(data);
        });

        this.socket.on(Events.currentTurn$, id => {
            this.currentTurnSubject.next(id);
        });

        this.socket.on(Events.mapUpdates$, data => {
            this.mapUpdateSubject.next(data);
        });
    }

    getPlayer(type: PlayerTypes, callback: (p: Player) => void) {
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
