import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class PubsubService implements OnModuleInit {
    constructor(private readonly websocketGateway: WebsocketGateway) { }
    async onModuleInit() {
        const connection = {
            host: 'localhost',
            port: 6379,
        }
        const sub = createClient({ url: 'redis://localhost:6379' });
        await sub.connect();
        await sub.subscribe('image-events', (message) => {
            const event = JSON.parse(message);
            console.log(`📣 PubSub Event:`, event);
            this.websocketGateway.emitEvent('image-events', event);
        });
    }

}
