// Importar solamente el Router de Express:
import { Router } from 'express';

import { productsController } from '../../controllers/api.controllers.js';

const productsRouter = Router();

productsRouter.get('/', productsController)
  
export default productsRouter
