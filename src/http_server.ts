import net from 'net';
import { Socket } from 'net';
import { This, RequestListener } from './utils/types';
import { InitEvents } from './http_events';

function Server(this: any, routers: any[]) {
  if (!(this instanceof Server)) return new (Server as any)(this, routers);

  /* if (!routers?.length) throw new Error('Define RequestListener'); */

  (this as This).routers = routers;

  (this as This)._netServer = net.createServer((socket: Socket) => new (InitEvents as any)(socket).data(this.routers));

  return this;
}

Server.prototype.listen = function listen(this: any, ...args: Array<string | number | Function>) { this._netServer.listen(...args) }

Server.prototype.use = function use(this: any, router: any) { this.routers.push(router) }

export { Server };