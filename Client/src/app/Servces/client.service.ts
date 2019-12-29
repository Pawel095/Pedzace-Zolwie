import { Injectable } from '@angular/core';
import { CustomSocket } from '../Models/CustomSocket';
import { Move } from '../Models/Move';
import { Events } from '../Enums/Events';
import { Player } from '../Models/Player';
import { PlayerTypes } from '../Enums/PlayerTypes';
import { promise } from 'protractor';
import { promisify } from 'util';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    socket: CustomSocket;
    ret;
    connect() {
        this.socket = new CustomSocket('http://localhost:1234');
    }
    emit() {
        this.socket.emit(Events.getTurtlePositions, 'data');
    }

    getPlayer(type: PlayerTypes, callback: (p: Player) => void) {
        this.socket.emit(Events.getPlayer, type, callback);
    }

    // Promise<{ n: number; id: number; type: PlayerTypes; card: undefined; highlighted: boolean; discarded: boolean }[]>

    getInitialPlayerBarData(): Promise<
        { n: number; id: number; type: PlayerTypes; card: undefined; highlighted: boolean; discarded: boolean }[]
    > {
        return new Promise(resolve => {
            this.socket.emit(
                Events.getInitialPlayerBarData,
                (data => {
                    console.log(this);
                    console.log(data);
                    resolve(data);
                }).bind(this)
            );
        });
    }
}
