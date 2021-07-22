import net from 'net';
import { Socket } from 'net';

type Request = {
  protocol: string,
  method: string,
  url: string,
  headers: object,
  body: string
}

const server = net.createServer((socket: Socket) => {
  console.log(socket.remoteAddress);

  socket.on('data', buf => {
    console.log(parsedRequest(buf.toString()));
    socket.write('HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{"hello": "world"}');
    socket.end();
  });
});

const parsedRequest = (requestString: string): Request => {
  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, url, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  const parsedHeaders = {} as { [key: string]: string }; 
  headers.split('\r\n').forEach((header) => {
    const [ key, value ] = header.split(': ');
    parsedHeaders[key] = value;
  });

  return { protocol, method, url, headers: parsedHeaders, body };
};

const divideString = (string: string, search: string) => {
  const index = string.indexOf(search);

  const first = string.slice(0, index);
  const rest = string.slice(index + search.length);

  return [ first, rest ];
};

server.listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));