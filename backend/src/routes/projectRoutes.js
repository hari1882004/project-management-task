import express from 'express';
import { ProjectController } from '../controllers/ProjectController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', ProjectController.getAllProjects);
router.get('/search', ProjectController.searchProjects);
router.get('/filter', ProjectController.filterProjects);
router.get('/:id', ProjectController.getProjectById);
router.post('/', ProjectController.createProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
