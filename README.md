# Project Management System

A modern, full-stack Project Management System web application built with React, Node.js, and MySQL. Manage projects and tasks efficiently with a professional, responsive interface.

## Features

- **User Authentication**: Secure registration and login with JWT
- **Project Management**: Create, read, update, delete projects
- **Task Management**: Manage tasks with priorities and due dates
- **Dashboard**: Visual statistics and recent activities
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Security**: Password hashing, protected routes, rate limiting
- **Data Validation**: Comprehensive input validation

## Technology Stack

### Frontend
- React 18.2
- React Router 6
- Axios
- Tailwind CSS
- Create React App

### Backend
- Node.js
- Express.js 4
- MySQL 8.0
- JWT Authentication
- bcryptjs

### Database
- MySQL 8.0 with proper indexing
- Foreign key relationships
- Normalized schema

## Project Structure

```
project-management/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API integration
│   │   ├── context/            # Auth context
│   │   ├── utils/              # Helper functions
│   │   ├── styles/             # CSS and Tailwind
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── backend/                     # Express backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API routes
│   │   ├── models/             # Database queries
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Auth, error handling
│   │   ├── validations/        # Input validation
│   │   ├── config/             # Configuration
│   │   └── server.js           # Express app
│   ├── database.sql            # MySQL schema
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── Documentation/
    ├── API_DOCUMENTATION.md
    ├── DATABASE_SETUP.md
    ├── DEPLOYMENT.md
    └── ER_DIAGRAM.md
```

## Quick Start

### Prerequisites
- Node.js 16+
- MySQL 8.0+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Configure database in .env:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_management
DB_PORT=3306
PORT=5000
JWT_SECRET=your_secret_key
```

5. Create database:
```bash
mysql -u root -p < database.sql
```

6. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/search?q=name` - Search projects
- `GET /api/projects/filter?status=status` - Filter by status

### Tasks
- `GET /api/projects/:projectId/tasks` - Get project tasks
- `POST /api/projects/:projectId/tasks` - Create task
- `GET /api/projects/:projectId/tasks/:id` - Get task
- `PUT /api/projects/:projectId/tasks/:id` - Update task
- `DELETE /api/projects/:projectId/tasks/:id` - Delete task
- `GET /api/projects/:projectId/tasks/search?q=name` - Search tasks
- `GET /api/projects/:projectId/tasks/filter` - Filter tasks

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('Not Started', 'In Progress', 'Completed'),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('Low', 'Medium', 'High'),
  status ENUM('Pending', 'In Progress', 'Completed'),
  due_date DATE,
  created_at TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

## Security Features

1. **Authentication**: JWT-based authentication
2. **Password Security**: bcryptjs hashing with salt
3. **Authorization**: Users can only access their own data
4. **Input Validation**: Comprehensive validation on all inputs
5. **Rate Limiting**: Protection against brute-force attacks
6. **CORS**: Configured cross-origin resource sharing
7. **SQL Injection Protection**: Parameterized queries
8. **Error Handling**: Secure error messages

## Pages and Features

### Authentication Pages
- **Login**: Secure user login
- **Register**: New user registration

### Main Application Pages
- **Dashboard**: Overview statistics and analytics
- **Projects**: List all projects with search and filter
- **Project Detail**: View project and manage tasks
- **Create/Edit Project**: Form for project management
- **Create/Edit Task**: Form for task management
- **Profile**: User information page

## Responsive Design

The application is fully responsive using mobile-first design:
- **Mobile** (< 768px): Single column layout, touch-friendly
- **Tablet** (768px - 1024px): Multi-column, optimized
- **Desktop** (> 1024px): Full featured layout with sidebar

## Performance Optimizations

- Efficient API calls with request/response caching
- Lazy loading of routes
- Optimized database queries with indexes
- Compression on API responses
- Code splitting in React

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
1. Prepare production environment
2. Build Docker image (optional)
3. Deploy to cloud platform
4. Configure environment variables
5. Setup SSL/TLS certificates

### Frontend Deployment
1. Build production bundle
2. Deploy to CDN or web server
3. Configure API URL
4. Setup HTTPS

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=project_management
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=15000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## File Descriptions

### Backend Key Files
- `src/server.js` - Express app initialization
- `src/config/database.js` - MySQL connection
- `src/config/jwt.js` - JWT token handling
- `src/middleware/auth.js` - Authentication middleware
- `src/middleware/errorHandler.js` - Error handling
- `src/controllers/` - Request handlers
- `src/services/` - Business logic
- `src/models/` - Database operations
- `database.sql` - Schema initialization

### Frontend Key Files
- `src/App.jsx` - Main app component
- `src/context/AuthContext.jsx` - Authentication state
- `src/services/api.js` - API integration
- `src/components/` - Reusable components
- `src/pages/` - Page components
- `src/utils/helpers.js` - Helper functions

## Common Issues & Solutions

### Backend Connection Issues
- Verify MySQL is running
- Check database credentials in .env
- Ensure database is created

### Frontend API Errors
- Verify backend is running on correct port
- Check REACT_APP_API_URL in .env
- Check browser console for detailed errors

### Authentication Issues
- Clear browser localStorage
- Verify JWT_SECRET in backend .env
- Check token expiration time

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes and test
4. Submit pull request

## Future Enhancements

- [ ] Advanced filtering and sorting
- [ ] Pagination
- [ ] User roles and permissions
- [ ] Team collaboration features
- [ ] File attachments
- [ ] Email notifications
- [ ] Activity logs
- [ ] Advanced reporting
- [ ] Integration with third-party tools
- [ ] Mobile app

## License

MIT License

## Support

For issues and questions:
1. Check documentation
2. Review API documentation
3. Check error messages
4. Review database schema

## Version

Version 1.0.0 - Initial Release

---

Built with by a full-stack development team. Production-ready and scalable.
