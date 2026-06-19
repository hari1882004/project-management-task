import { ProjectModel } from '../models/Project.js';
import { TaskModel } from '../models/Task.js';

export class DashboardService {
  static async getDashboardStats(userId) {
    const totalProjects = await ProjectModel.countByUserId(userId);
    const completedProjects = await ProjectModel.countCompletedByUserId(userId);
    const inProgressProjects = await ProjectModel.countInProgressByUserId(userId);
    const totalTasks = await TaskModel.countByUserId(userId);
    const completedTasks = await TaskModel.countCompletedByUserId(userId);
    const pendingTasks = await TaskModel.countPendingByUserId(userId);
    const recentProjects = await ProjectModel.getRecentByUserId(userId, 5);
    const recentTasks = await TaskModel.getRecentByUserId(userId, 5);

    return {
      stats: {
        totalProjects,
        completedProjects,
        inProgressProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        taskCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      },
      recentProjects,
      recentTasks
    };
  }
}
