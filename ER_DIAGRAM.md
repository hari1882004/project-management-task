# ER Diagram - Entity Relationship Diagram

## Database Schema Visualization

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                    PROJECT MANAGEMENT SYSTEM DATABASE                       ║
╚═════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│ USERS Table                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                    INT AUTO_INCREMENT                                │
│     fullname              VARCHAR(255) NOT NULL                             │
│ UQ  email                 VARCHAR(255) UNIQUE NOT NULL                      │
│     password              VARCHAR(255) NOT NULL (bcrypt hashed)             │
│     created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP               │
│                                                                              │
│ Indexes:                                                                     │
│ - PRIMARY KEY (id)                                                          │
│ - UNIQUE KEY (email)                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ (1:N)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ PROJECTS Table                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                    INT AUTO_INCREMENT                                │
│ FK  user_id               INT NOT NULL → USERS(id)                          │
│     project_name          VARCHAR(255) NOT NULL                             │
│     description           TEXT                                              │
│     status                ENUM('Not Started', 'In Progress', 'Completed')   │
│                           DEFAULT 'Not Started'                             │
│     start_date            DATE                                              │
│     end_date              DATE                                              │
│     created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP               │
│                                                                              │
│ Indexes:                                                                     │
│ - PRIMARY KEY (id)                                                          │
│ - FOREIGN KEY (user_id) ON DELETE CASCADE                                   │
│ - INDEX idx_user_id (user_id)                                               │
│ - INDEX idx_status (status)                                                 │
│ - INDEX idx_created_at (created_at)                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ (1:N)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ TASKS Table                                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK  id                    INT AUTO_INCREMENT                                │
│ FK  project_id            INT NOT NULL → PROJECTS(id)                       │
│     task_name             VARCHAR(255) NOT NULL                             │
│     description           TEXT                                              │
│     priority              ENUM('Low', 'Medium', 'High')                     │
│                           DEFAULT 'Medium'                                  │
│     status                ENUM('Pending', 'In Progress', 'Completed')       │
│                           DEFAULT 'Pending'                                 │
│     due_date              DATE                                              │
│     created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP               │
│                                                                              │
│ Indexes:                                                                     │
│ - PRIMARY KEY (id)                                                          │
│ - FOREIGN KEY (project_id) ON DELETE CASCADE                                │
│ - INDEX idx_project_id (project_id)                                         │
│ - INDEX idx_status (status)                                                 │
│ - INDEX idx_priority (priority)                                             │
│ - INDEX idx_created_at (created_at)                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Relationships Explained

### 1. Users → Projects (One-to-Many)

```
One User CAN HAVE many Projects
One Project MUST BELONG TO exactly one User

User Example:
- id: 1
- fullname: "John Doe"
- email: "john@example.com"

Associated Projects:
- Project 1: Website Redesign (user_id: 1)
- Project 2: Mobile App (user_id: 1)
- Project 3: API Development (user_id: 1)

Foreign Key Constraint: REFERENCES users(id) ON DELETE CASCADE
- If user is deleted, all their projects are deleted
```

### 2. Projects → Tasks (One-to-Many)

```
One Project CAN HAVE many Tasks
One Task MUST BELONG TO exactly one Project

Project Example:
- id: 1
- project_name: "Website Redesign"
- user_id: 1

Associated Tasks:
- Task 1: Design Homepage (project_id: 1)
- Task 2: Develop Backend (project_id: 1)
- Task 3: Setup Database (project_id: 1)

Foreign Key Constraint: REFERENCES projects(id) ON DELETE CASCADE
- If project is deleted, all its tasks are deleted
```

## Data Flow Example

```
User Registration:
├── Users table gets new row
│   └── id: 1, fullname: "John Doe", email: "john@example.com"
│
User creates Project:
├── Projects table gets new row
│   └── id: 1, user_id: 1 (reference to Users), project_name: "Website"
│
User adds Task to Project:
├── Tasks table gets new row
│   └── id: 1, project_id: 1 (reference to Projects), task_name: "Design"
│
Delete Cascade Example:
├── Delete Project (id: 1)
│   └── All Tasks with project_id = 1 are automatically deleted
│
├── Delete User (id: 1)
│   ├── All Projects with user_id = 1 are deleted
│   └── All Tasks in those projects are deleted (cascade)
```

## Cardinality Notation

```
User ──────────── (1:N) ────────────── Project
  │                                       │
  │ (1 user has many projects)            │
  │                                       │
  │    Project ──────────── (1:N) ────────┤
  │                                       │
  │                           (1 project has many tasks)
  │                                       │
  └─────────────────────────────────────── Task
```

## CRUD Operations by Relationship

### Create Operations
```sql
-- Create User
INSERT INTO users (fullname, email, password) VALUES (...)

-- Create Project (must reference existing user)
INSERT INTO projects (user_id, project_name, ...) VALUES (existing_user_id, ...)

-- Create Task (must reference existing project)
INSERT INTO tasks (project_id, task_name, ...) VALUES (existing_project_id, ...)
```

### Read Operations
```sql
-- Get all projects for a user
SELECT * FROM projects WHERE user_id = 1

-- Get all tasks for a project
SELECT * FROM tasks WHERE project_id = 1

-- Get task details with project and user info (JOIN)
SELECT t.*, p.project_name, u.fullname
FROM tasks t
JOIN projects p ON t.project_id = p.id
JOIN users u ON p.user_id = u.id
WHERE u.id = 1
```

### Update Operations
```sql
-- Update project (user_id cannot change due to business logic)
UPDATE projects SET status = 'Completed' WHERE id = 1 AND user_id = 1

-- Update task
UPDATE tasks SET status = 'Completed' WHERE id = 1 AND project_id IN (
  SELECT id FROM projects WHERE user_id = 1
)
```

### Delete Operations
```sql
-- Delete specific task
DELETE FROM tasks WHERE id = 1 AND project_id IN (
  SELECT id FROM projects WHERE user_id = 1
)

-- Delete project (cascades to delete all tasks)
DELETE FROM projects WHERE id = 1 AND user_id = 1

-- Delete user (cascades to delete all projects and their tasks)
DELETE FROM users WHERE id = 1
```

## Index Strategy

### Why These Indexes?

```
Users Table:
├── email: UNIQUE INDEX
│   └── Purpose: Fast login lookup, ensure uniqueness
│
Projects Table:
├── user_id: INDEX
│   └── Purpose: Fast filtering of user's projects
├── status: INDEX
│   └── Purpose: Fast filtering by project status
└── created_at: INDEX
    └── Purpose: Fast sorting by creation date
│
Tasks Table:
├── project_id: INDEX
│   └── Purpose: Fast filtering of project's tasks
├── status: INDEX
│   └── Purpose: Fast filtering by task status
├── priority: INDEX
│   └── Purpose: Fast filtering by task priority
└── created_at: INDEX
    └── Purpose: Fast sorting by creation date
```

## Query Performance Impact

```
Without Index:
├── Full table scan required
├── Slower with large datasets (thousands of rows)
└── O(n) time complexity

With Index:
├── B-tree index used
├── Fast lookup even with large datasets
└── O(log n) time complexity
```

## Database Normalization

This schema follows **Third Normal Form (3NF)**:

1. **1NF (First Normal Form)**
   - All columns contain atomic values
   - No repeating groups

2. **2NF (Second Normal Form)**
   - Meets 1NF requirements
   - All non-key attributes are fully dependent on primary key

3. **3NF (Third Normal Form)**
   - Meets 2NF requirements
   - No transitive dependencies
   - No non-key attribute depends on another non-key attribute

## Data Integrity

### Referential Integrity
```
Projects.user_id MUST refer to existing Users.id
Tasks.project_id MUST refer to existing Projects.id
```

### Cascade Delete Rules
```
DELETE User → DELETE User's Projects → DELETE Projects' Tasks
```

### Constraints
```
- email: UNIQUE (only one user per email)
- user_id in projects: NOT NULL (project must belong to user)
- project_id in tasks: NOT NULL (task must belong to project)
```

---

For more information about the database design, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)
