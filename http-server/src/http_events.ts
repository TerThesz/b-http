import { Socket } from 'net';
import { IngoingMessage } from './http_ingoing';
import { OutgoingMessage } from './http_outgoing';
import { RequestListener } from './utils/types';

function InitEvents(this: any, socket: Socket) {
  if (!socket) throw 'Give socket >:(';

  this.socket = socket;
}

InitEvents.prototype.data = function(this: any, requestListener: RequestListener) {
  this.socket.on('data', (buffer: Buffer) => {
    const req = new (IngoingMessage as any)(this.socket, buffer);
    const res = new (OutgoingMessage as any)(this.socket, buffer);

    requestListener(req, res);

    if (res.canBeSent === true) this.socket.end('HTTP/1.1 200 OK');
  });
}

export { InitEvents };