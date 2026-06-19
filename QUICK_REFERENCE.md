# Quick Reference Guide

Fast reference for common tasks and commands in Project Management System.

## Common Commands

### Backend

```bash
# Start development server
cd backend
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# Create database
mysql -u root -p < database.sql
```

### Frontend

```bash
# Start development server
cd frontend
npm start

# Build for production
npm run build

# Install dependencies
npm install
```

## Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| MySQL | localhost:3306 |

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=project_management
DB_PORT=3306
PORT=5000
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get profile

### Projects
- `GET /api/projects` - Get all
- `POST /api/projects` - Create
- `GET /api/projects/:id` - Get one
- `PUT /api/projects/:id` - Update
- `DELETE /api/projects/:id` - Delete
- `GET /api/projects/search?q=query` - Search
- `GET /api/projects/filter?status=status` - Filter

### Tasks
- `GET /api/projects/:projectId/tasks` - Get all
- `POST /api/projects/:projectId/tasks` - Create
- `GET /api/projects/:projectId/tasks/:id` - Get one
- `PUT /api/projects/:projectId/tasks/:id` - Update
- `DELETE /api/projects/:projectId/tasks/:id` - Delete
- `GET /api/projects/:projectId/tasks/search?q=query` - Search
- `GET /api/projects/:projectId/tasks/filter?status=status&priority=priority` - Filter

### Dashboard
- `GET /api/dashboard` - Get stats

## Testing API with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"John Doe","email":"john@example.com","password":"Password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'
```

### Get Projects (with token)
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN"
```

## Database Queries

### View all projects for user
```sql
SELECT * FROM projects WHERE user_id = 1;
```

### View all tasks for project
```sql
SELECT * FROM tasks WHERE project_id = 1;
```

### View user with projects and tasks
```sql
SELECT u.*, p.project_name, t.task_name 
FROM users u
LEFT JOIN projects p ON u.id = p.user_id
LEFT JOIN tasks t ON p.id = t.project_id
WHERE u.id = 1;
```

### Count tasks by status
```sql
SELECT status, COUNT(*) FROM tasks GROUP BY status;
```

### Get recent projects
```sql
SELECT * FROM projects ORDER BY created_at DESC LIMIT 5;
```

## Project Structure

```
backend/                  Frontend application
├── src/
│   ├── controllers/     API handlers
│   ├── models/          Database operations
│   ├── routes/          API routes
│   ├── services/        Business logic
│   ├── middleware/      Request middleware
│   ├── validations/     Input validation
│   └── config/          Configuration

frontend/               React application
├── src/
│   ├── components/     React components
│   ├── pages/          Page components
│   ├── services/       API client
│   ├── context/        Auth context
│   └── utils/          Helper functions
```

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
```bash
# Test connection
mysql -h localhost -u root -p project_management

# Check MySQL status
mysql -u root -p -e "SELECT 1"
```

### npm Dependencies Issue
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### React Build Issues
```bash
# Use legacy peer deps
npm install --legacy-peer-deps

# Clear build cache
rm -rf build node_modules
npm install
npm run build
```

## File Locations

| Item | Path |
|------|------|
| Database schema | backend/database.sql |
| Backend config | backend/.env.example |
| Frontend config | frontend/.env.example |
| Backend API | backend/src/server.js |
| Frontend App | frontend/src/App.jsx |
| Documentation | *.md files in root |

## Key Files to Know

### Backend
- `src/server.js` - Main server file
- `src/config/database.js` - Database connection
- `src/models/` - Database queries
- `src/services/` - Business logic

### Frontend
- `src/App.jsx` - Main app
- `src/context/AuthContext.jsx` - Auth state
- `src/services/api.js` - API client
- `src/pages/` - Application pages

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## Response Format

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": "error message"
  }
}
```

## Enum Values

### Project Status
- Not Started
- In Progress
- Completed

### Task Status
- Pending
- In Progress
- Completed

### Task Priority
- Low
- Medium
- High

## Performance Tips

1. **Backend**: Use indexes for frequently queried fields
2. **Frontend**: Use React DevTools to check component renders
3. **Database**: Write efficient queries, avoid N+1 problems
4. **Network**: Check browser DevTools for slow requests

## Security Reminders

- Never commit .env files
- Use strong JWT_SECRET in production
- Hash all passwords with bcryptjs
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting
- Keep dependencies updated

## Development Workflow

1. Start MySQL
2. Start backend: `npm run dev` in backend/
3. Start frontend: `npm start` in frontend/
4. Open browser: http://localhost:3000
5. Test features
6. Check console for errors
7. Review network requests in DevTools

## Useful Tools

- **Postman**: API testing
- **MySQL Workbench**: Database management
- **VS Code**: Code editor
- **React DevTools**: React debugging
- **Redux DevTools**: State debugging (if using Redux)

## Documentation

| Document | Content |
|----------|---------|
| README.md | Project overview |
| INSTALLATION.md | Setup instructions |
| API_DOCUMENTATION.md | API reference |
| DATABASE_SETUP.md | Database guide |
| ER_DIAGRAM.md | Database diagram |
| DEPLOYMENT.md | Production guide |

## Useful Links

- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Tailwind CSS: https://tailwindcss.com
- MySQL Docs: https://dev.mysql.com/doc
- JWT: https://jwt.io

## Getting Help

1. Check documentation files
2. Review error messages
3. Check console/terminal output
4. Review database logs
5. Check network requests in DevTools
6. Search issue online

---

For more detailed information, see the full documentation files.
