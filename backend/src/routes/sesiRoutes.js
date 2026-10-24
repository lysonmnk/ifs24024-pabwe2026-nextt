import { Router } from 'express';
import { sesiController } from '../controllers/sesiController.js';

const router = Router();

router.delete('/:id', sesiController.delete);

export default router;
