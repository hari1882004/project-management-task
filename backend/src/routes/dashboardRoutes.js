import express from 'express';
import { DashboardController } from '../controllers/DashboardController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', DashboardController.getDashboard);

export default router;
