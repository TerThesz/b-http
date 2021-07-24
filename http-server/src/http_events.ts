import { Socket } from 'net';
import { IngoingMessage } from './http_ingoing';
import { OutgoingMessage } from './http_outgoing';
import { RequestListener } from './utils/types';

function InitEvents(this: any, socket: Socket) {
  if (!socket) throw 'Give socket >:(';

  this.socket = socket;
}

InitEvents.prototype.data = function(this: any, routers: any[]) {
  console.debug('New request: ' + this.socket.remoteAddress);
  
  this.socket.on('data', (buffer: Buffer) => {
    const req = new (IngoingMessage as any)(this.socket, buffer);
    const res = new (OutgoingMessage as any)(this.socket, buffer);

    routers.forEach((router: any) => router.callFunctions(req, res));

    const endLine = '\r\n';

    let response =
      `${res.protocol} ${res.statusCode} ${res.statusMessage}` + endLine +
      `Date: ${new Date()}` + endLine +
      `Server: ${res.server}` + endLine +
      `Last-Modified: ${res.lastModified}`;

    if (res.headers != {}) {
      response += endLine;
      const names = Object.keys(res.headers);

      names.forEach((name: any, index: number) => {
        response += name + ': ' + res.headers[name] + endLine;
      });
    }
    if (res.body != null) response += endLine + res.body;

    if (res.canBeSent === true) {
      res.wasSent = true;
      this.socket.end(response);
    }
  });
}

export { InitEvents };