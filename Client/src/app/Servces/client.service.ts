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

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    socket: CustomSocket;

    private playerBarCardUpdatesSubject = new Subject<{ id: number; card: Card | null }>();
    public playerBarCardUpdates$ = this.playerBarCardUpdatesSubject.asObservable();

    private currentTurnSubject = new ReplaySubject<number>();
    public currentTurn$ = this.currentTurnSubject.asObservable();

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
}
