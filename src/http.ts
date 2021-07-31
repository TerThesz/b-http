import { Server } from './http_server';
import { Socket } from 'net';
import { RequestListener } from './utils/types';
import { router } from './http_router';

const routers: Array<any> = [];

function createServer(this: any, ...requestListeners: RequestListener[]) {
  return new (Server as any)([ ...routers, ...requestListeners ]);
}

const Router: any = router;

const use = (fn: any) => routers.push(fn);

export { createServer, Router, use };