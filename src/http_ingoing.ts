import { Socket } from 'net';
import { divideString } from './utils';
import { resolve } from 'path';
import { sync } from 'glob';

const kHeaders = Symbol('kHeaders');
const kQuery = Symbol('kQuery');

function IngoingMessage(this: any, socket: Socket, buffer: Buffer) {
  this.socket = socket;

  this[kHeaders] = {};
  this.rawHeaders = [];

  this.ip = socket.remoteAddress;

  this.protocol = null;
  this.method = null;
  this.url = null;
  this[kQuery] = {};
  this.body = null;

  // Parse request
  const requestString = buffer.toString();

  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, urlAndQuery, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  this.method = method;
  this.protocol = protocol;

  const [ url, rawQuery ] = urlAndQuery.split('?');
  this.url = url;

  if (rawQuery) {
    const query = rawQuery.split('&');
    query.forEach((parameter: string) => {
      const [ key, value ] = parameter.split('=');
      this[kQuery][key] = value;
    });
  }

  const files = sync(resolve('./src/headers/**/*.ts'));
  headers.split('\r\n').forEach((header: string) => {
    const [ key, value ] = header.split(': ');
    this[kHeaders][key] = value;
    this.rawHeaders.push(header);
  
    const file = files.find((file: string) => file.split('/').slice(-1)[0].replace('.ts', '') === key.toLowerCase());
    if (file) (require(file))(socket, method);
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

Object.defineProperty(IngoingMessage.prototype, 'query', {
  get: function() {
    return this[kQuery];
  },
  set: function(val) {
    this[kQuery] = val;
  }
});

export { IngoingMessage };
