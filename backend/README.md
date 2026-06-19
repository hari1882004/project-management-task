# Project Management System - Backend

Production-quality backend API for Project Management System built with Node.js and Express.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **Database**: MySQL 8.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Validator.js
- **Rate Limiting**: express-rate-limit

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # MySQL connection pool
│   │   └── jwt.js               # JWT token generation and verification
│   ├── controllers/
│   │   ├── AuthController.js    # Authentication logic
│   │   ├── ProjectController.js # Project CRUD operations
│   │   ├── TaskController.js    # Task CRUD operations
│   │   └── DashboardController.js # Dashboard statistics
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── errorHandler.js      # Error handling middleware
│   │   └── rateLimiter.js       # Rate limiting middleware
│   ├── models/
│   │   ├── User.js              # User database operations
│   │   ├── Project.js           # Project database operations
│   │   └── Task.js              # Task database operations
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   ├── projectRoutes.js     # Project routes
│   │   ├── taskRoutes.js        # Task routes
│   │   └── dashboardRoutes.js   # Dashboard routes
│   ├── services/
│   │   ├── AuthService.js       # Authentication business logic
│   │   ├── ProjectService.js    # Project business logic
│   │   ├── TaskService.js       # Task business logic
│   │   └── DashboardService.js  # Dashboard business logic
│   ├── validations/
│   │   └── validators.js        # Input validation functions
│   └── server.js                # Express app setup and server initialization
├── database.sql                 # MySQL schema
├── package.json                 # Dependencies
├── .env.example                 # Environment variables example
└── README.md                    # This file
```

## Installation

### Prerequisites

- Node.js 16.0 or higher
- MySQL 8.0 or higher
- npm or yarn

### Setup Steps

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create database:
```bash
mysql -u root -p < database.sql
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Update `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_management
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logout successful"
}
```

#### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "fullname": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Project Endpoints

#### Get All Projects
```
GET /api/projects
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "project_name": "Website Redesign",
      "description": "Redesign company website",
      "status": "In Progress",
      "start_date": "2024-01-15",
      "end_date": "2024-03-15",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Project by ID
```
GET /api/projects/:id
Authorization: Bearer <token>
```

#### Create Project
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "project_name": "Website Redesign",
  "description": "Redesign company website",
  "status": "Not Started",
  "start_date": "2024-01-15",
  "end_date": "2024-03-15"
}
```

#### Update Project
```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "project_name": "Website Redesign",
  "status": "In Progress"
}
```

#### Delete Project
```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

#### Search Projects
```
GET /api/projects/search?q=website
Authorization: Bearer <token>
```

#### Filter Projects by Status
```
GET /api/projects/filter?status=In%20Progress
Authorization: Bearer <token>
```

### Task Endpoints

#### Get Tasks by Project
```
GET /api/projects/:projectId/tasks
Authorization: Bearer <token>
```

#### Get Task by ID
```
GET /api/projects/:projectId/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```
POST /api/projects/:projectId/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "task_name": "Design Homepage",
  "description": "Create homepage mockup",
  "priority": "High",
  "status": "Pending",
  "due_date": "2024-02-15"
}
```

#### Update Task
```
PUT /api/projects/:projectId/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "In Progress",
  "priority": "Medium"
}
```

#### Delete Task
```
DELETE /api/projects/:projectId/tasks/:id
Authorization: Bearer <token>
```

#### Search Tasks
```
GET /api/projects/:projectId/tasks/search?q=homepage
Authorization: Bearer <token>
```

#### Filter Tasks
```
GET /api/projects/:projectId/tasks/filter?status=Pending&priority=High
Authorization: Bearer <token>
```

### Dashboard Endpoints

#### Get Dashboard Statistics
```
GET /api/dashboard
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "stats": {
      "totalProjects": 5,
      "completedProjects": 2,
      "inProgressProjects": 2,
      "totalTasks": 25,
      "completedTasks": 10,
      "pendingTasks": 8,
      "taskCompletionRate": 40
    },
    "recentProjects": [...],
    "recentTasks": [...]
  }
}
```

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcryptjs with salt rounds
3. **Input Validation**: Comprehensive input validation
4. **Rate Limiting**: Prevents brute-force attacks
5. **CORS**: Cross-origin resource sharing configured
6. **Parameterized Queries**: Protection against SQL injection
7. **Error Handling**: Centralized error handling

## Database Schema

### Users Table
- `id` (INT, Primary Key)
- `fullname` (VARCHAR 255)
- `email` (VARCHAR 255, UNIQUE)
- `password` (VARCHAR 255)
- `created_at` (TIMESTAMP)

### Projects Table
- `id` (INT, Primary Key)
- `user_id` (INT, Foreign Key)
- `project_name` (VARCHAR 255)
- `description` (TEXT)
- `status` (ENUM: Not Started, In Progress, Completed)
- `start_date` (DATE)
- `end_date` (DATE)
- `created_at` (TIMESTAMP)

### Tasks Table
- `id` (INT, Primary Key)
- `project_id` (INT, Foreign Key)
- `task_name` (VARCHAR 255)
- `description` (TEXT)
- `priority` (ENUM: Low, Medium, High)
- `status` (ENUM: Pending, In Progress, Completed)
- `due_date` (DATE)
- `created_at` (TIMESTAMP)

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "fieldName": "Field-specific error message"
  }
}
```

## Environment Variables

- `DB_HOST`: MySQL host (default: localhost)
- `DB_USER`: MySQL username (default: root)
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: Database name (default: project_management)
- `DB_PORT`: MySQL port (default: 3306)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Token expiration time (default: 7d)
- `FRONTEND_URL`: Frontend URL for CORS

## Testing

To test the API, use tools like:
- Postman
- Insomnia
- cURL

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePassword123"}'
```

## Deployment

### Environment Setup for Production

1. Update `.env` with production credentials
2. Set `NODE_ENV=production`
3. Use a strong JWT_SECRET
4. Configure database backups
5. Setup SSL/TLS certificates
6. Use environment-specific error handling

### Using PM2 for Process Management

```bash
npm install -g pm2

pm2 start src/server.js --name "project-mgmt"
pm2 save
pm2 startup
```

## Contributing

1. Follow the existing code structure
2. Use consistent naming conventions
3. Add error handling for all operations
4. Validate all user inputs
5. Test API endpoints before committing

## License

MIT
