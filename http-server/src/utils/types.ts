import { Socket } from 'net';

type Request = {
  protocol: string,
  method: string,
  url: string,
  headers: object,
  raw_headers: string[],
  body: string,
  client: Socket
}

type Response = {

}

type NextFunction = {

}

type RequestListener = ((req?: Request, res?: Response, next?: NextFunction) => void);

type This = {
  [key: string]: any
}

export { Request, Response, NextFunction, RequestListener, This };