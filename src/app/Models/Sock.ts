import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

export class CustomSocket extends Socket {
    constructor(url) {
        super({ url, options: {} });
    }
}
