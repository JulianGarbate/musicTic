import { Router } from 'express';
import { crearUsuario, login, escucho } from '../controllers/authController';
const authRouter = Router();

app.post('/crearusuario', crearUsuario);y
app.post('/login', login);
app.post('/escucho', escucho);

export default authRouter;