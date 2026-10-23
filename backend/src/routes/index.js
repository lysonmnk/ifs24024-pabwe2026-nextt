import { Router } from 'express';
import materiRoutes from './materiRoutes.js';
import sesiRoutes from './sesiRoutes.js';
import { sendSuccess } from '../utils/responseHelper.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  return sendSuccess(res, 200, 'API siap melayani permintaan', {
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

router.use('/materi', materiRoutes);
router.use('/sesi', sesiRoutes);

export default router;
