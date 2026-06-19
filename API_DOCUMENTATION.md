# API Documentation

Complete API reference for Project Management System backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "fieldName": "Field-specific error"
  }
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response**
```json
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

**Validation Rules**
- fullname: Required, non-empty
- email: Required, valid email format, unique
- password: Required, minimum 8 characters

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response**
```json
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

**Error Responses**
- 401: Invalid email or password

---

### Logout User
**POST** `/auth/logout`

Logout user (invalidate session).

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Get User Profile
**GET** `/auth/profile`

Retrieve current user profile information.

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
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

---

## Project Endpoints

### Get All Projects
**GET** `/projects`

Retrieve all projects for the logged-in user.

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
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

---

### Get Project by ID
**GET** `/projects/:id`

Retrieve a specific project.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- id: Project ID

**Response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "project_name": "Website Redesign",
    "description": "Redesign company website",
    "status": "In Progress",
    "start_date": "2024-01-15",
    "end_date": "2024-03-15",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses**
- 404: Project not found

---

### Create Project
**POST** `/projects`

Create a new project.

**Headers**
```
Authorization: Bearer <token>
```

**Request Body**
```json
{
  "project_name": "Website Redesign",
  "description": "Redesign company website",
  "status": "Not Started",
  "start_date": "2024-01-15",
  "end_date": "2024-03-15"
}
```

**Response**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 2,
    "user_id": 1,
    "project_name": "Website Redesign",
    "description": "Redesign company website",
    "status": "Not Started",
    "start_date": "2024-01-15",
    "end_date": "2024-03-15",
    "created_at": "2024-01-16T10:30:00Z"
  }
}
```

**Validation Rules**
- project_name: Required, non-empty
- status: Must be one of: Not Started, In Progress, Completed
- Dates must be valid ISO 8601 format

---

### Update Project
**PUT** `/projects/:id`

Update an existing project.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- id: Project ID

**Request Body** (all fields optional)
```json
{
  "project_name": "Website Redesign v2",
  "status": "In Progress",
  "end_date": "2024-04-15"
}
```

**Response**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "project_name": "Website Redesign v2",
    "description": "Redesign company website",
    "status": "In Progress",
    "start_date": "2024-01-15",
    "end_date": "2024-04-15",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### Delete Project
**DELETE** `/projects/:id`

Delete a project and all associated tasks.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- id: Project ID

**Response**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### Search Projects
**GET** `/projects/search?q=website`

Search projects by name.

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- q: Search query (required)

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "project_name": "Website Redesign",
      ...
    }
  ]
}
```

---

### Filter Projects by Status
**GET** `/projects/filter?status=In%20Progress`

Filter projects by status.

**Headers**
```
Authorization: Bearer <token>
```

**Query Parameters**
- status: Status to filter by (required)
  - Not Started
  - In Progress
  - Completed

**Response**
```json
{
  "success": true,
  "data": [...]
}
```

---

## Task Endpoints

### Get Tasks by Project
**GET** `/projects/:projectId/tasks`

Get all tasks for a specific project.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "project_id": 1,
      "task_name": "Design Homepage",
      "description": "Create homepage mockup",
      "priority": "High",
      "status": "In Progress",
      "due_date": "2024-02-15",
      "created_at": "2024-01-20T10:30:00Z"
    }
  ]
}
```

---

### Get Task by ID
**GET** `/projects/:projectId/tasks/:id`

Get a specific task.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID
- id: Task ID

**Response**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "project_id": 1,
    "task_name": "Design Homepage",
    "description": "Create homepage mockup",
    "priority": "High",
    "status": "In Progress",
    "due_date": "2024-02-15",
    "created_at": "2024-01-20T10:30:00Z"
  }
}
```

---

### Create Task
**POST** `/projects/:projectId/tasks`

Create a new task in a project.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID

**Request Body**
```json
{
  "task_name": "Design Homepage",
  "description": "Create homepage mockup",
  "priority": "High",
  "status": "Pending",
  "due_date": "2024-02-15"
}
```

**Response**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 2,
    "project_id": 1,
    "task_name": "Design Homepage",
    "description": "Create homepage mockup",
    "priority": "High",
    "status": "Pending",
    "due_date": "2024-02-15",
    "created_at": "2024-01-21T10:30:00Z"
  }
}
```

**Validation Rules**
- task_name: Required, non-empty
- priority: Must be one of: Low, Medium, High
- status: Must be one of: Pending, In Progress, Completed

---

### Update Task
**PUT** `/projects/:projectId/tasks/:id`

Update a task.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID
- id: Task ID

**Request Body** (all fields optional)
```json
{
  "status": "In Progress",
  "priority": "Medium"
}
```

**Response**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 1,
    "project_id": 1,
    "task_name": "Design Homepage",
    "description": "Create homepage mockup",
    "priority": "Medium",
    "status": "In Progress",
    "due_date": "2024-02-15",
    "created_at": "2024-01-20T10:30:00Z"
  }
}
```

---

### Delete Task
**DELETE** `/projects/:projectId/tasks/:id`

Delete a task.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID
- id: Task ID

**Response**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

### Search Tasks
**GET** `/projects/:projectId/tasks/search?q=design`

Search tasks by name.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID

**Query Parameters**
- q: Search query (required)

**Response**
```json
{
  "success": true,
  "data": [...]
}
```

---

### Filter Tasks
**GET** `/projects/:projectId/tasks/filter?status=Pending&priority=High`

Filter tasks by status and/or priority.

**Headers**
```
Authorization: Bearer <token>
```

**URL Parameters**
- projectId: Project ID

**Query Parameters**
- status: Task status (optional)
  - Pending
  - In Progress
  - Completed
- priority: Task priority (optional)
  - Low
  - Medium
  - High

**Response**
```json
{
  "success": true,
  "data": [...]
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics
**GET** `/dashboard`

Get dashboard statistics for the logged-in user.

**Headers**
```
Authorization: Bearer <token>
```

**Response**
```json
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
    "recentProjects": [
      {
        "id": 5,
        "project_name": "Recent Project",
        "status": "In Progress",
        "created_at": "2024-01-20T10:30:00Z"
      }
    ],
    "recentTasks": [
      {
        "id": 25,
        "task_name": "Recent Task",
        "status": "Pending",
        "created_at": "2024-01-21T10:30:00Z"
      }
    ]
  }
}
```

---

## Rate Limiting

Rate limits are applied to prevent abuse:

- Login: 5 attempts per 15 minutes
- Register: 5 attempts per hour
- General API: 100 requests per 15 minutes

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later"
}
```

---

## Error Codes

- **400**: Bad Request - Invalid input or validation error
- **401**: Unauthorized - Invalid or missing token
- **404**: Not Found - Resource not found
- **409**: Conflict - Duplicate entry
- **500**: Internal Server Error - Server error

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Get Projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer <token>"
```

---

## Status Codes Reference

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST/create request |
| 400 | Bad Request | Invalid input or validation error |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate entry |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

---

For more information, see the main README.md or backend README.md
