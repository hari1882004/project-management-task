import pool from '../config/database.js';

export class TaskModel {
  static async findByIdAndProjectId(taskId, projectId) {
    const [rows] = await pool.query(
      `SELECT t.* FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE t.id = ? AND t.project_id = ?`,
      [taskId, projectId]
    );
    return rows[0] || null;
  }

  static async findByProjectId(projectId) {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC',
      [projectId]
    );
    return rows;
  }

  static async findByProjectIdAndUserId(projectId, userId) {
    const [rows] = await pool.query(
      `SELECT t.* FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE t.project_id = ? AND p.user_id = ? 
       ORDER BY t.created_at DESC`,
      [projectId, userId]
    );
    return rows;
  }

  static async create(projectId, taskName, description, priority, status, dueDate) {
    const [result] = await pool.query(
      'INSERT INTO tasks (project_id, task_name, description, priority, status, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [projectId, taskName, description || null, priority || 'Medium', status || 'Pending', dueDate || null]
    );
    return result.insertId;
  }

  static async update(taskId, userId, updates) {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (['task_name', 'description', 'priority', 'status', 'due_date'].includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return false;

    values.push(taskId, userId);

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)`;
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }

  static async delete(taskId, userId) {
    const query = `DELETE FROM tasks WHERE id = ? AND project_id IN (SELECT id FROM projects WHERE user_id = ?)`;
    const [result] = await pool.query(query, [taskId, userId]);
    return result.affectedRows > 0;
  }

  static async countByUserId(userId) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) as count FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE p.user_id = ?`,
      [userId]
    );
    return rows[0].count;
  }

  static async countCompletedByUserId(userId) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) as count FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE p.user_id = ? AND t.status = ?`,
      [userId, 'Completed']
    );
    return rows[0].count;
  }

  static async countPendingByUserId(userId) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) as count FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE p.user_id = ? AND t.status = ?`,
      [userId, 'Pending']
    );
    return rows[0].count;
  }

  static async getRecentByUserId(userId, limit = 5) {
    const [rows] = await pool.query(
      `SELECT t.* FROM tasks t 
       JOIN projects p ON t.project_id = p.id 
       WHERE p.user_id = ? 
       ORDER BY t.created_at DESC 
       LIMIT ?`,
      [userId, limit]
    );
    return rows;
  }
}
