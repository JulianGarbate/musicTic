import { Router } from 'express';
import { crearUsuario, login } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/crearusuario', crearUsuario);
authRouter.post('/login', login);

export default authRouter;
