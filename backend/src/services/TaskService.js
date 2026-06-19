import { TaskModel } from '../models/Task.js';
import { ProjectModel } from '../models/Project.js';

export class TaskService {
  static async getAllTasks(userId) {
    return await TaskModel.findByProjectIdAndUserId(null, userId);
  }

  static async getTasksByProjectId(projectId, userId) {
    await ProjectModel.findByIdAndUserId(projectId, userId);
    return await TaskModel.findByProjectIdAndUserId(projectId, userId);
  }

  static async getTaskById(taskId, projectId, userId) {
    await ProjectModel.findByIdAndUserId(projectId, userId);
    const task = await TaskModel.findByIdAndProjectId(taskId, projectId);
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;
    }
    return task;
  }

  static async createTask(projectId, userId, taskName, description, priority, status, dueDate) {
    await ProjectModel.findByIdAndUserId(projectId, userId);
    const taskId = await TaskModel.create(projectId, taskName, description, priority, status, dueDate);
    return await TaskModel.findByIdAndProjectId(taskId, projectId);
  }

  static async updateTask(taskId, projectId, userId, updates) {
    await this.getTaskById(taskId, projectId, userId);
    const success = await TaskModel.update(taskId, userId, updates);
    if (!success) {
      const error = new Error('Failed to update task');
      error.status = 400;
      throw error;
    }
    return await TaskModel.findByIdAndProjectId(taskId, projectId);
  }

  static async deleteTask(taskId, projectId, userId) {
    await this.getTaskById(taskId, projectId, userId);
    const success = await TaskModel.delete(taskId, userId);
    if (!success) {
      const error = new Error('Failed to delete task');
      error.status = 400;
      throw error;
    }
    return { message: 'Task deleted successfully' };
  }

  static async searchTasks(projectId, userId, query) {
    const tasks = await this.getTasksByProjectId(projectId, userId);
    return tasks.filter(t =>
      t.task_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async filterTasksByStatus(projectId, userId, status) {
    const tasks = await this.getTasksByProjectId(projectId, userId);
    return tasks.filter(t => t.status === status);
  }

  static async filterTasksByPriority(projectId, userId, priority) {
    const tasks = await this.getTasksByProjectId(projectId, userId);
    return tasks.filter(t => t.priority === priority);
  }
}
