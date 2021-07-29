import { createServer, Router } from './src/http';
const router = new Router();

createServer(router.get('/', (req: any, res: any) => res.json({dano: "smrdi", mato: "vonia"}))).listen(6969);