import { Socket } from 'net';
import { divideString } from './utils';

const kHeaders = Symbol('kHeaders');

console.log("testing");

function IngoingMessage(this: any, socket: Socket, buffer: Buffer) {
  this.socket = socket;

  this[kHeaders] = {};
  this.rawHeaders = [];

  this.protocol = null;
  this.method = null;
  this.url = null;
  this.body = null;

  // Parse request
  const requestString = buffer.toString();

  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, url, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  this.method = method;
  this.url = url;
  this.protocol = protocol;

  headers.split('\r\n').forEach((header: string) => {
    const [ key, value ] = header.split(': ');
    this[kHeaders][key] = value;
    this.rawHeaders.push(header);
  });

  this.body = body;
}

Object.defineProperty(IngoingMessage.prototype, 'headers', {
  get: function() {
    return this[kHeaders];
  },
  set: function(val) {
    this[kHeaders] = val;
  }
});

export { IngoingMessage };