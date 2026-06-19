import pool from '../config/database.js';

export class UserModel {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT id, fullname, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(fullname, email, passwordHash) {
    const [result] = await pool.query(
      'INSERT INTO users (fullname, email, password, created_at) VALUES (?, ?, ?, NOW())',
      [fullname, email, passwordHash]
    );
    return result.insertId;
  }

  static async getPassword(email) {
    const [rows] = await pool.query('SELECT id, password FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }
}
