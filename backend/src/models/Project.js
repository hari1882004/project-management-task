import pool from '../config/database.js';

export class ProjectModel {
  static async findByIdAndUserId(projectId, userId) {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE id = ? AND user_id = ?',
      [projectId, userId]
    );
    return rows[0] || null;
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async create(userId, projectName, description, status, startDate, endDate) {
    const [result] = await pool.query(
      'INSERT INTO projects (user_id, project_name, description, status, start_date, end_date, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [userId, projectName, description || null, status || 'Not Started', startDate || null, endDate || null]
    );
    return result.insertId;
  }

  static async update(projectId, userId, updates) {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (['project_name', 'description', 'status', 'start_date', 'end_date'].includes(key)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return false;

    values.push(projectId, userId);

    const query = `UPDATE projects SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }

  static async delete(projectId, userId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query('DELETE FROM tasks WHERE project_id = ? AND id IN (SELECT id FROM tasks WHERE project_id = ?)', [projectId, projectId]);
      const [result] = await connection.query('DELETE FROM projects WHERE id = ? AND user_id = ?', [projectId, userId]);

      await connection.commit();
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async countByUserId(userId) {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM projects WHERE user_id = ?', [userId]);
    return rows[0].count;
  }

  static async countCompletedByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status = ?',
      [userId, 'Completed']
    );
    return rows[0].count;
  }

  static async countInProgressByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status = ?',
      [userId, 'In Progress']
    );
    return rows[0].count;
  }

  static async getRecentByUserId(userId, limit = 5) {
    const [rows] = await pool.query(
      'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    return rows;
  }
}
