// Importar solamente el Router de Express:
import { Router } from 'express';

import { userController } from '../../controllers/api.controllers.js';

const userRouter = Router();

userRouter.get('/', userController)
  
export default userRouter


