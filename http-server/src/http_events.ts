import { Socket } from 'net';
import { IngoingMessage } from './http_ingoing';
import { RequestListener } from './utils/types';

function InitEvents(this: any, socket: Socket) {
  if (!socket) throw 'Give socket >:(';

  this.socket = socket;
}

InitEvents.prototype.data = function(this: any, requestListener: RequestListener) {
  this.socket.on('data', (buffer: Buffer) => {
    const res = () => {
      const im = () => "prd";
      return im;
    }

    requestListener(
      new (IngoingMessage as any)(this.socket, buffer)
    );
  });
}

export { InitEvents };