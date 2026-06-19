import { ProjectModel } from '../models/Project.js';

export class ProjectService {
  static async getAllProjects(userId) {
    return await ProjectModel.findByUserId(userId);
  }

  static async getProjectById(projectId, userId) {
    const project = await ProjectModel.findByIdAndUserId(projectId, userId);
    if (!project) {
      const error = new Error('Project not found');
      error.status = 404;
      throw error;
    }
    return project;
  }

  static async createProject(userId, projectName, description, status, startDate, endDate) {
    const projectId = await ProjectModel.create(userId, projectName, description, status, startDate, endDate);
    return await ProjectModel.findByIdAndUserId(projectId, userId);
  }

  static async updateProject(projectId, userId, updates) {
    await this.getProjectById(projectId, userId);
    const success = await ProjectModel.update(projectId, userId, updates);
    if (!success) {
      const error = new Error('Failed to update project');
      error.status = 400;
      throw error;
    }
    return await ProjectModel.findByIdAndUserId(projectId, userId);
  }

  static async deleteProject(projectId, userId) {
    await this.getProjectById(projectId, userId);
    const success = await ProjectModel.delete(projectId, userId);
    if (!success) {
      const error = new Error('Failed to delete project');
      error.status = 400;
      throw error;
    }
    return { message: 'Project deleted successfully' };
  }

  static async searchProjects(userId, query) {
    const allProjects = await ProjectModel.findByUserId(userId);
    return allProjects.filter(p =>
      p.project_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  static async filterProjectsByStatus(userId, status) {
    const allProjects = await ProjectModel.findByUserId(userId);
    return allProjects.filter(p => p.status === status);
  }
}
