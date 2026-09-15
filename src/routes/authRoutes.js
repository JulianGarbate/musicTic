import { Router } from 'express';
import { crearUsuario, login, escucho } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/crearusuario', crearUsuario);
authRouter.post('/login', login);
authRouter.put('/escucho', escucho);

export default authRouter;