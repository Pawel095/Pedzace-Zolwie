import { Injectable } from '@angular/core';
import { CustomSocket } from '../Models/CustomSocket';
import { Move } from '../Models/Move';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    socket: CustomSocket;
    connect() {
        this.socket = new CustomSocket('http://localhost:1234');
    }
    emit() {
        this.socket.emit('getTurtlePositions', 'data');
    }
}
