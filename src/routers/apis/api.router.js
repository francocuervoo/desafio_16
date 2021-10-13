// Importar solamente el Router de Express:
import { Router } from 'express';

import userRouter from './user.router.js';
import productsRouter from './products.router.js';

const apiRouter = Router();

apiRouter
    .use('/user', userRouter)
    .use('/products', productsRouter)
;

export default apiRouter



