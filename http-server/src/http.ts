import { Server } from './http_server';
import { Socket } from 'net';
import { RequestListener } from './utils/types';

function createServer(this: any, ...requestListeners: RequestListener[]) {
  return new (Server as any)(requestListeners);
}

createServer((req: any, res: any, next: any) => {
  console.log('prd');
  next();
}, (req: any, res: any) => {
  res.status(500).json({name: "jano", sex: "4x per day"});
}).listen(3000, '0.0.0.0', () => console.log('🏃 on port 3000'));

export { createServer };