import { Server } from './http_server';
import { Socket } from 'net';

function createServer(this: any, options: any, requestListener?: (socket: Socket) => void) {
  return new (Server as any)(this, options, requestListener);
}

createServer((req: any, res: any) => {
}).listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));

export { createServer };