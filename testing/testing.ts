import { createServer, Router } from '../src/http';

createServer(Route1(), Route2(), Route3()).listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));

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

function Route3() {
  const _router = new Router();

  _router.get('/query', (req: any, res: any, next: any) => {
    res.json(req.query);
  });

  return _router;
}

function Route2() {
  const _router = new Router();

  _router.get('/user', (req: any, res: any, next: any) => {
    res.json({ name: "Andrew", sex: "3x per day." });
  });

  return _router;
}