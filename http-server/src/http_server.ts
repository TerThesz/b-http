import net from 'net';
import { Socket } from 'net';
import { This, RequestListener } from './utils/types';
import { InitEvents } from './http_events';

function Server(this: any, requestListeners: RequestListener[]) {
  if (!(this instanceof Server)) return new (Server as any)(this, requestListeners);

  if (!requestListeners?.length) throw new Error('Define RequestListener');

  (this as This).netServer = net.createServer((socket: Socket) => new (InitEvents as any)(socket).data(requestListeners));
}

Server.prototype.listen = function (this: any, ...args: Array<string | number | Function>) { this.netServer.listen(...args) }

export { Server }