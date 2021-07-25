import { Socket } from 'net';

type RequestListener = ((req?: any, res?: any, next?: any) => void);

type This = {
  [key: string]: any
}

export { RequestListener, This };