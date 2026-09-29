import { Router } from 'express';
import { crearUsuario, login, crearCancion, escucho } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/crearusuario', crearUsuario);
authRouter.post('/login', login);
authRouter.post('/crearcancion', crearCancion);
authRouter.put('/escucho', escucho);

export default authRouter;