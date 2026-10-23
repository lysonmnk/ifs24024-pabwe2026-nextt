import { Router } from 'express';
import { materiController } from '../controllers/materiController.js';
import { sesiController } from '../controllers/sesiController.js';

const router = Router();

router.get('/', materiController.getAll);
router.post('/', materiController.create);
router.get('/:id', materiController.getById);
router.put('/:id', materiController.update);
router.delete('/:id', materiController.delete);

// Nested routes for sessions under a material
router.get('/:materiId/sesi', sesiController.getByMateriId);
router.post('/:materiId/sesi', sesiController.create);

export default router;
