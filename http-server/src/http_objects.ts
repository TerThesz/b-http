import { Socket } from 'net';
import { divideString } from './utils';

function IncomingMessage(this: any, socket: Socket) {
  this.socket = socket;

  this.headers = [];
  this.rawHeaders = [];
  this.protocol = null;
  this.method = null;
  this.url = null;
  this.body = null;
}

IncomingMessage.prototype.parseRequest = function(this: any, buffer: Buffer) {
  const requestString = buffer.toString();

  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, url, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  this.method = method;
  this.url = url;
  this.protocol = protocol;

  headers.split('\r\n').forEach((header: string) => {
    const [ key, value ] = header.split(': ');
    this.headers[key] = value;
    this.rawHeaders.push(header);
  });

  this.body = body;
}

function ServerResponse(this: any, socket: Socket) {
  this.socket = socket;

  this.protocol = 'HTTP/1.1';
  this.statusCode = null;
  this.statusMessage = null;
  this.headers = [];
  this.body = null;
  this.server = null;
  this.lastModified = new Date();
}

ServerResponse.prototype.response = function(this: any, buffer: Buffer) {
  Object.setPrototypeOf(this, () => console.log("world"));
}

export { IncomingMessage, ServerResponse };