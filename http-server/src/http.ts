import net from 'net';
import { Socket } from 'net';
import { parse } from './helpers';

const server = net.createServer((socket: Socket) => {
  socket.on('data', buf => {
    console.log(parse.request(buf.toString()));
    socket.write('HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{"hello": "world"}');
    socket.end();
  });
});

server.listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));