// Importar solamente el Router de Express:
import { Router } from 'express';

import { userFacebook } from '../../controllers/api.controllers.js';

const userRouter = Router();

userRouter.get('/', userFacebook)
  
export default userRouter


