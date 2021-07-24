import { Server } from './http_server';
import { Socket } from 'net';
import { RequestListener } from './utils/types';
import { router } from './http_router';

function createServer(this: any, ...requestListeners: RequestListener[]) {
  return new (Server as any)(requestListeners);
}

const Router = new (router as any);

console.log({ router, Router });

createServer(Router.get('/', (req: any, res: any, next: any) => {
  console.log('prd');
}), Router.get('/', (req: any, res: any, next: any) => {
  res.write("prdim");
})).listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));

export { createServer };