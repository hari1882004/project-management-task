import mysql from 'mysql2/promise';
import fs from 'fs';

async function setupDatabase() {
  try {
    // Connect without specifying a database to create it
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hari@2004'
    });

    console.log('Connected to MySQL');

    // Read the SQL file
    const sql = fs.readFileSync('./database.sql', 'utf8');

    // Split by semicolon and execute each statement
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
          console.log('Executed:', statement.substring(0, 50) + '...');
        } catch (err) {
          console.log('Error (may be expected):', err.message);
        }
      }
    }

    console.log('Database setup completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('Database setup error:', error);
  }
}

setupDatabase();
