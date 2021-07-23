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