import * as express from 'express';
import * as socketio from 'socket.io';

const app = express();
app.set('port', process.env.PORT || 3000);
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket: socketio.Socket) => {
    const ip = socket.handshake.address.replace(/^[\:f]+/, '');
    console.log(`Connected ${ip}`);

    socket.on('message', data => {
        console.log(`Event:"message" Data:"${data}"`);
    });
    socket.on('disconnect', reason => {
        console.log(`Disconnected ${ip}, reason: ${reason}`);
    });
});

const server = http.listen(1234, () => {
    console.log('TestServer Started on 1234');
});
