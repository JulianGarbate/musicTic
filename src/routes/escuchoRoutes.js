import { Router } from 'express';
import { escucho } from '../controllers/escuchoController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = Router();

router.post('/', verifyToken, escucho);

export default router;
