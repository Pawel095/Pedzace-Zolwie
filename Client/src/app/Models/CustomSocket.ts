import { Socket } from 'ngx-socket-io';


export class CustomSocket extends Socket {
    constructor(url) {
        super({ url, options: {} });
    }
}
