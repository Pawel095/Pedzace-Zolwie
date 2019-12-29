import * as express from 'express';
import * as socketio from 'socket.io';
import { Game } from './game';
import { Move } from './Utils/Move';
import { PlayerTypes } from './Utils/PlayerTypes';
import { Events } from './Events';

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

io.on('connection', (socket: socketio.Socket) => {
    const ip = socket.handshake.address.replace(/^[\:f]+/, '');
    console.log(`Connected ${ip}`);

    // in lobby
    socket.on(Events.getPlayer, (type: PlayerTypes) => {});

    // after lobby
    socket.on(Events.getInitialPlayerBarData, () => {});

    // During gameplay
    socket.on(Events.getTurtlePositions, () => {});
    socket.on(Events.getAiAmmount, () => {});
    socket.on(Events.getHuAmmount, () => {});
    socket.on(Events.playerMove, (m: Move) => {});

    socket.on('disconnect', reason => {
        console.log(`Disconnected ${ip}, reason: ${reason}`);
    });
});

const server = http.listen(1234, () => {
    console.log('TestServer Started on 1234');
});
