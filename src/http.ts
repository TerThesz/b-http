import { Server } from './http_server';
import { Socket } from 'net';
import { RequestListener } from './utils/types';
import { router } from './http_router';

function createServer(this: any, ...requestListeners: RequestListener[]) {
  return new (Server as any)(requestListeners);
}

const Router: any = router;

export { createServer, Router };