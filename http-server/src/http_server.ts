import net from 'net';
import { Socket } from 'net';
import { This, RequestListener } from './utils/types';
import { InitEvents } from './http_events';

function Server(this: any, options: any, requestListener?: RequestListener) {
  if (!(this instanceof Server)) return new (Server as any)(this, options, requestListener);

  if (typeof options === 'function') {
    requestListener = options;
    options = {};
  } 
  else if (options === undefined || typeof options === 'object') options = { ...options };
  else throw 'Define options/requestListener.';

  if (!requestListener) throw 'Define requestListener.';

  (this as This).netServer = net.createServer((socket: Socket) => new (InitEvents as any)(socket).data(requestListener));
}

Server.prototype.listen = function (this: any, ...args: Array<string | number | Function>) { this.netServer.listen(...args) }

export { Server }

// Use this later in a request handler
/* request: (requestString: string): Request => {
  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, url, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  const parsedHeaders = {} as { [key: string]: string }; 
  headers.split('\r\n').forEach((header) => {
    const [ key, value ] = header.split(': ');
    parsedHeaders[key] = value;
  });

  return { protocol, method, url, headers: parsedHeaders, body };
}, */