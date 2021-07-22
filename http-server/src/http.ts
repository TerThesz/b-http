import net from 'net';
import { Socket } from 'net';

const server = net.createServer((socket: Socket) => {
});

server.listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));