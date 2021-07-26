import { Server } from './http_server';
import { Socket } from 'net';
import { RequestListener } from './utils/types';
import { router } from './http_router';

function createServer(this: any, ...requestListeners: RequestListener[]) {
  return new (Server as any)(requestListeners);
}

const Router: any = router;

// Testing
/* createServer(Route1(), Route2()).listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));

function Route1() {
  const _router = new Router();

  _router.get('/', (req: any, res: any, next: any) => {
    console.log('Hello ');
    next();
  }, (req: any, res: any, next: any) => {
    console.log('World!');
    next();
  });

  _router.get('/', (req: any, res: any, next: any) => {
    res.write("Hello World!");
  });

  return _router;
}

function Route2() {
  const _router = new Router();

  _router.get('/user', (req: any, res: any, next: any) => {
    res.json({ name: "Andrew", sex: "3x per day." });
  });

  return _router;
} */

export { createServer, Router };