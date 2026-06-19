# Database Setup Guide

Complete guide for setting up the MySQL database for Project Management System.

## Prerequisites

- MySQL 8.0 or higher installed
- MySQL command-line access or MySQL Workbench
- Database creation privileges

## Database Setup Steps

### 1. Create Database

Using command line:
```bash
mysql -u root -p < backend/database.sql
```

Or manually:
```sql
CREATE DATABASE IF NOT EXISTS project_management;
USE project_management;
```

### 2. Create Tables

The database schema includes three main tables:

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Projects Table
```sql
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Not Started', 'In Progress', 'Completed') DEFAULT 'Not Started',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### Tasks Table
```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  INDEX idx_project_id (project_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Database Relationships

### Entity Relationship Diagram

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ id (PK)         │
│ fullname        │
│ email (UNIQUE)  │
│ password        │
│ created_at      │
└────────┬────────┘
         │ (1:N)
         │
         ▼
┌─────────────────┐
│   PROJECTS      │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ project_name    │
│ description     │
│ status          │
│ start_date      │
│ end_date        │
│ created_at      │
└────────┬────────┘
         │ (1:N)
         │
         ▼
┌─────────────────┐
│     TASKS       │
├─────────────────┤
│ id (PK)         │
│ project_id (FK) │
│ task_name       │
│ description     │
│ priority        │
│ status          │
│ due_date        │
│ created_at      │
└─────────────────┘

Relationships:
- One User has Many Projects (1:N)
- One Project has Many Tasks (1:N)
```

## Database Configuration

### Environment Variables

Update backend `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_management
DB_PORT=3306
```

### Connection Pool Settings

The connection pool in `src/config/database.js`:
- Connection limit: 10
- Wait for connections: enabled
- Queue limit: 0 (unlimited)

## Database Features

### Foreign Keys
- Projects.user_id references Users.id with CASCADE delete
- Tasks.project_id references Projects.id with CASCADE delete

When a user is deleted, all their projects are deleted.
When a project is deleted, all its tasks are deleted.

### Indexes

Indexes are created for:
- `users.email` (UNIQUE) - Fast email lookup
- `projects.user_id` - Fast project filtering by user
- `projects.status` - Fast project filtering by status
- `projects.created_at` - Fast sorting by creation date
- `tasks.project_id` - Fast task filtering by project
- `tasks.status` - Fast task filtering by status
- `tasks.priority` - Fast task filtering by priority
- `tasks.created_at` - Fast sorting by creation date

### Character Set

All tables use:
- Character Set: utf8mb4
- Collation: utf8mb4_unicode_ci

This supports all Unicode characters including emojis.

## Sample Data

### Insert Sample User

```sql
INSERT INTO users (fullname, email, password, created_at)
VALUES (
  'John Doe',
  'john@example.com',
  '$2a$10$...',  -- bcrypt hashed password
  NOW()
);
```

### Insert Sample Project

```sql
INSERT INTO projects (user_id, project_name, description, status, start_date, end_date, created_at)
VALUES (
  1,
  'Website Redesign',
  'Redesign the company website',
  'In Progress',
  '2024-01-15',
  '2024-03-15',
  NOW()
);
```

### Insert Sample Task

```sql
INSERT INTO tasks (project_id, task_name, description, priority, status, due_date, created_at)
VALUES (
  1,
  'Design Homepage',
  'Create homepage mockup',
  'High',
  'Pending',
  '2024-02-15',
  NOW()
);
```

## Database Maintenance

### View Table Structure

```sql
DESCRIBE users;
DESCRIBE projects;
DESCRIBE tasks;
```

### View All Databases

```sql
SHOW DATABASES;
```

### View All Tables

```sql
USE project_management;
SHOW TABLES;
```

### View Indexes

```sql
SHOW INDEXES FROM users;
SHOW INDEXES FROM projects;
SHOW INDEXES FROM tasks;
```

### Check Foreign Keys

```sql
SELECT CONSTRAINT_NAME, TABLE_NAME, REFERENCED_TABLE_NAME
FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'project_management';
```

## Database Backup

### Backup Database

```bash
mysqldump -u root -p project_management > backup.sql
```

### Backup All Databases

```bash
mysqldump -u root -p --all-databases > all_databases.sql
```

### Restore from Backup

```bash
mysql -u root -p project_management < backup.sql
```

## Database Reset

### Drop and Recreate Database

```sql
DROP DATABASE IF EXISTS project_management;
CREATE DATABASE project_management;
USE project_management;
-- Run schema creation queries
```

Or using command line:

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS project_management;"
mysql -u root -p < backend/database.sql
```

## Performance Optimization

### Query Optimization Tips

1. **Use Indexes Effectively**
   ```sql
   -- Fast: Uses index on user_id
   SELECT * FROM projects WHERE user_id = 1;
   
   -- Slower: Full table scan
   SELECT * FROM projects WHERE YEAR(created_at) = 2024;
   ```

2. **Use Pagination**
   ```sql
   -- Return 10 records starting from 0
   SELECT * FROM projects WHERE user_id = 1 LIMIT 10 OFFSET 0;
   ```

3. **Select Specific Columns**
   ```sql
   -- Faster: Only needed columns
   SELECT id, project_name FROM projects;
   
   -- Slower: All columns including large fields
   SELECT * FROM projects;
   ```

### Monitor Performance

```sql
-- Check table size
SELECT 
  TABLE_NAME, 
  ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables 
WHERE table_schema = 'project_management';

-- Check row count
SELECT TABLE_NAME, TABLE_ROWS 
FROM information_schema.tables 
WHERE table_schema = 'project_management';
```

## Troubleshooting

### Connection Issues

**Problem**: "Can't connect to MySQL server"

**Solution**:
1. Verify MySQL is running: `mysql --version`
2. Check credentials in .env
3. Verify MySQL is listening on configured port
4. Check firewall settings

### Foreign Key Constraint Error

**Problem**: "Cannot add or update a child row: a foreign key constraint fails"

**Solution**:
1. Ensure parent record exists
2. Ensure correct data types match
3. Check `CONSTRAINT_NAME` for details

### Duplicate Entry Error

**Problem**: "Duplicate entry for key 'email'"

**Solution**:
1. Email must be unique
2. Use different email for new users
3. Or update existing user record

## Security Best Practices

1. **Never store plain text passwords** - Always use bcrypt
2. **Use environment variables** - Store credentials safely
3. **Enable SSL/TLS** - For production connections
4. **Regular backups** - Backup critical data
5. **Access control** - Limit database user permissions
6. **Monitor access** - Enable query logging in production

## Database User Permissions

For production, create a limited user:

```sql
CREATE USER 'project_app'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON project_management.* TO 'project_app'@'localhost';
FLUSH PRIVILEGES;
```

Permissions granted:
- SELECT: Read data
- INSERT: Add new records
- UPDATE: Modify records
- DELETE: Remove records

NOT granted:
- CREATE: Cannot modify schema
- DROP: Cannot delete tables
- ALTER: Cannot modify table structure

---

For more information, see the main README.md or backend documentation.
