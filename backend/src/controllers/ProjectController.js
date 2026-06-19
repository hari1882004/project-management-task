import { ProjectService } from '../services/ProjectService.js';
import { validateProject } from '../validations/validators.js';

export class ProjectController {
  static async getAllProjects(req, res, next) {
    try {
      const projects = await ProjectService.getAllProjects(req.userId);

      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req, res, next) {
    try {
      const project = await ProjectService.getProjectById(req.params.id, req.userId);

      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProject(req, res, next) {
    try {
      const { project_name, description, status, start_date, end_date } = req.body;

      const validation = validateProject(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const project = await ProjectService.createProject(
        req.userId,
        project_name,
        description,
        status,
        start_date,
        end_date
      );

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req, res, next) {
    try {
      const validation = validateProject(req.body);
      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      const project = await ProjectService.updateProject(req.params.id, req.userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Project updated successfully',
        data: project
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req, res, next) {
    try {
      await ProjectService.deleteProject(req.params.id, req.userId);

      res.status(200).json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchProjects(req, res, next) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const projects = await ProjectService.searchProjects(req.userId, q);

      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      next(error);
    }
  }

  static async filterProjects(req, res, next) {
    try {
      const { status } = req.query;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status filter is required'
        });
      }

      const projects = await ProjectService.filterProjectsByStatus(req.userId, status);

      res.status(200).json({
        success: true,
        data: projects
      });
    } catch (error) {
      next(error);
    }
  }
}
