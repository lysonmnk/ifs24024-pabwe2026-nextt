import { Router } from 'express';
import materiRoutes from './materiRoutes.js';
import sesiRoutes from './sesiRoutes.js';

const router = Router();

router.use('/materi', materiRoutes);
router.use('/sesi', sesiRoutes);

export default router;
