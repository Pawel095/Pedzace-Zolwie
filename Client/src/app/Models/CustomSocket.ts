import { Socket, SocketIoConfig } from 'ngx-socket-io';

export class CustomSocket extends Socket {
    constructor(data: SocketIoConfig) {
        super(data);
    }
}
