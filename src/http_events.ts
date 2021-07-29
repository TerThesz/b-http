import { Socket } from 'net';
import { IngoingMessage } from './http_ingoing';
import { OutgoingMessage } from './http_outgoing';

function InitEvents(this: any, socket: Socket) {
  if (!socket) throw 'Give socket >:(';

  this.socket = socket;
  this.closedConnection = false;
}

InitEvents.prototype.data = function data(this: any, routers: any[]) {
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

    if (this.closedConnection === true) return;
    if (res.canBeSent === true) {
      res.wasSent = true;
      this.socket.end(response);
    }
  });

  this.socket.on('error', () => this.closedConnection = true);
  this.socket.on('disconnect', () => this.closedConnection = true);
}

export { InitEvents };