import { Socket } from 'net';

function OutgoingMessage(this: any, socket: Socket) {
  this.socket = socket;

  this.protocol = 'HTTP/1.1';
  this.statusCode = null;
  this.statusMessage = null;
  this.headers = [];
  this.body = null;
  this.server = null;
  this.lastModified = new Date();

  this.canBeSent = false;
}

export { OutgoingMessage };