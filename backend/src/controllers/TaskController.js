import { TaskService } from '../services/TaskService.js';
import { validateTask } from '../validations/validators.js';

export class TaskController {
  static async getAllTasks(req, res, next) {
    try {
      const tasks = await TaskService.getAllTasks(req.userId);

      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTasksByProjectId(req, res, next) {
    try {
      const tasks = await TaskService.getTasksByProjectId(req.params.projectId, req.userId);

      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      const task = await TaskService.getTaskById(req.params.id, req.params.projectId, req.userId);

      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTask(req, res, next) {
    try {
      const { task_name, description, priority, status, due_date } = req.body;

      const validation = validateTask(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const task = await TaskService.createTask(
        req.params.projectId,
        req.userId,
        task_name,
        description,
        priority,
        status,
        due_date
      );

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    try {
      const validation = validateTask(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const task = await TaskService.updateTask(req.params.id, req.params.projectId, req.userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      await TaskService.deleteTask(req.params.id, req.params.projectId, req.userId);

      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchTasks(req, res, next) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const tasks = await TaskService.searchTasks(req.params.projectId, req.userId, q);

      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }

  static async filterTasks(req, res, next) {
    try {
      const { status, priority } = req.query;

      let tasks = await TaskService.getTasksByProjectId(req.params.projectId, req.userId);

      if (status) {
        tasks = tasks.filter(t => t.status === status);
      }

      if (priority) {
        tasks = tasks.filter(t => t.priority === priority);
      }

      res.status(200).json({
        success: true,
        data: tasks
      });
    } catch (error) {
      next(error);
    }
  }
}
