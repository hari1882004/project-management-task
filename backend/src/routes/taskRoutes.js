import express from 'express';
import { TaskController } from '../controllers/TaskController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', TaskController.getTasksByProjectId);
router.get('/search', TaskController.searchTasks);
router.get('/filter', TaskController.filterTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
