import * as express from 'express';
import * as socketio from 'socket.io';
import { Game } from './game';
import { Move } from './Utils/Move';
import { PlayerTypes } from './Utils/PlayerTypes';
import { Events } from './Events';
import { callbackify } from 'util';
import { Player } from './Utils/Player';
import { TurtlePiece } from './Utils/TurtlePiece';
import { Card } from './Utils/Card';
import { observable, Observable, Subscription } from 'rxjs';

// export interface IGameStateService {
//     setup(): {};
//     registerPlayer(p: IPlayer, type: PlayerTypes): {};
//     getPlayer(type: PlayerTypes): {};
//     getInitialPlayerBarData(): Array<{
//         n: number;
//         id: number;
//         type: PlayerTypes;
//         card: undefined;
//         highlighted: boolean;
//         discarded: boolean;
//     }>;
//     playerMove(m: Move): {};
//     validateMove(m: Move): boolean;
// }

const app = express();
app.set('port', process.env.PORT || 3000);
const http = require('http').Server(app);
const io = require('socket.io')(http);

const game = new Game();
game.setup(1);

const unsubList: Subscription[] = [];

io.on('connection', (socket: socketio.Socket) => {
    const ip = socket.handshake.address.replace(/^[\:f]+/, '');
    console.log(`Connected ${ip}`);

    socket.on('debug', () => {
        game.startGame();
    });

    // as soon as client connects | in lobby
    socket.on(Events.getPlayer, (type: PlayerTypes, callback: (p: Player) => void) => {
        callback(game.getPlayer(type));
    });

    // after lobby
    socket.on(
        Events.getInitialPlayerBarData,
        (
            callback: (
                data: Array<{
                    n: number;
                    id: number;
                    type: PlayerTypes;
                    card: undefined;
                    highlighted: boolean;
                    discarded: boolean;
                }>
            ) => void
        ) => {
            callback(game.getInitialPlayerBarData());
        }
    );

    // During gameplay
    socket.on(Events.getTurtlePositions, (callback: (data: TurtlePiece[]) => void) => {
        callback(game.getTurtlePositions());
    });
    socket.on(Events.getAiAmmount, () => {});
    socket.on(Events.getHuAmmount, () => {});
    socket.on(Events.playerMove, (m: Move) => {});

    // observables
    unsubList.push(
        game.playerBarCardUpdates$.subscribe((data: { id: number; card: Card | null }) => {
            socket.emit(Events.playerBarUpdates$, data);
            console.log('PlayerBarUpdates$', data);
        })
    );
    unsubList.push(
        game.currentTurn$.subscribe(id => {
            socket.emit(Events.currentTurn$, id);
            console.log('CurrentTurn$', id);
        })
    );
    unsubList.push(
        game.mapUpdates$.subscribe((data: TurtlePiece[]) => {
            socket.emit(Events.mapUpdates$, data);
            console.log('mapUpdates$', data);
        })
    );

    socket.on('disconnect', reason => {
        console.log(`Disconnected ${ip}, reason: ${reason}`);
        unsubList.forEach(e => {
            e.unsubscribe();
        });
    });
});

const server = http.listen(1234, () => {
    console.log('TestServer Started on 1234');
});
