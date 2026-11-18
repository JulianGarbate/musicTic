import { Router } from 'express';
import { crearCancion, modificarCancion, borrarCancion } from '../controllers/cancionController.js';
import { verifyToken, verifyAdmin } from '../middlewares/verify.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, crearCancion);
router.put('/', verifyToken, verifyAdmin, modificarCancion);
router.delete('/', verifyToken, verifyAdmin, borrarCancion);

export default router;
