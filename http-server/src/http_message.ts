import { Socket } from 'net';
import { This, Request, Response, NextFunction } from './utils/types';
import { divideString } from './utils';

function IncomingMessage(this: any, socket: Socket) {
  this.socket = socket;

  this.reqHeaders = [];
  this.reqRawHeaders = [];

  this.resHeaders = [];
  this.resRawHeaders = [];
  this.statusCode = null;
  this.statusMessage = null;
}

IncomingMessage.prototype.parseRequest = function(this: any, buffer: Buffer) {
  const requestString = buffer.toString();

  const [ firstLine, rest ] = divideString(requestString, '\r\n');

  const [ method, url, protocol ] = firstLine.split(' ', 3);
  const [ headers, body ] = divideString(rest, '\r\n\r\n');

  headers.split('\r\n').forEach((header: string) => {
    const [ key, value ] = header.split(': ');
    this.reqHeaders[key] = value;
    this.reqRawHeaders.push(header);
  });

  const req: Request = {
    protocol,
    method,
    url,
    headers: this.reqHeaders,
    raw_headers: this.reqRawHeaders,
    body,
    client: this.socket
  };

  return req;
}

IncomingMessage.prototype.response = function(this: any, socket: Socket) {

}

IncomingMessage.prototype.nextFunction = function(this: any, socket: Socket) {

}

export { IncomingMessage };