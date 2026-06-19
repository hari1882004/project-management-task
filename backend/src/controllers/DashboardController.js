import { DashboardService } from '../services/DashboardService.js';

export class DashboardController {
  static async getDashboard(req, res, next) {
    try {
      const dashboardData = await DashboardService.getDashboardStats(req.userId);

      res.status(200).json({
        success: true,
        data: dashboardData
      });
    } catch (error) {
      next(error);
    }
  }
}
