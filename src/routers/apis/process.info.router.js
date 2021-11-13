import { Router } from 'express';
import { infoProcess } from '../../controllers/api.controllers.js';

const userRouter = Router();

userRouter.get('/', infoProcess)
  
export default userRouter


