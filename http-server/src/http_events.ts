import { Socket } from 'net';
import { IncomingMessage } from './http_message';
import { RequestListener } from './utils/types';

function InitEvents(this: any, socket: Socket) {
  if (!socket) throw 'Give socket >:(';

  this.socket = socket;
}

InitEvents.prototype.data = function(this: any, requestListener: RequestListener) {
  this.socket.on('data', (buffer: Buffer) => {
    const _IncomingMessage = new (IncomingMessage as any)(this.socket);

    requestListener(
      _IncomingMessage.parseRequest(buffer),
      _IncomingMessage.response(this.socket),
      _IncomingMessage.nextFunction(this.socket)
    );
  });
}

export { InitEvents };