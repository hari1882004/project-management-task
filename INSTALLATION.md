# Installation and Setup Guide

Complete step-by-step guide to install and run the Project Management System locally.

## System Requirements

### Minimum Requirements
- **OS**: Windows, macOS, or Linux
- **RAM**: 4GB minimum
- **Disk Space**: 5GB
- **Node.js**: 16.0 or higher
- **MySQL**: 8.0 or higher
- **npm**: 8.0 or higher

## Prerequisites Installation

### 1. Install Node.js

Download from [nodejs.org](https://nodejs.org/)

**Verify installation**:
```bash
node --version
npm --version
```

### 2. Install MySQL

Download from [mysql.com](https://www.mysql.com/downloads/)

**Verify installation**:
```bash
mysql --version
```

**Start MySQL service**:
- **Windows**: MySQL should start automatically, or use `net start MySQL80`
- **macOS**: `brew services start mysql`
- **Linux**: `sudo systemctl start mysql`

## Project Setup

### Step 1: Navigate to Project Directory

```bash
cd path/to/project-management
```

### Step 2: Database Setup

#### Create Database

1. Open MySQL command line:
```bash
mysql -u root -p
```

2. Run schema:
```bash
mysql -u root -p < backend/database.sql
```

Or manually:
```bash
cd backend
mysql -u root -p
mysql> SOURCE database.sql
mysql> EXIT
```

#### Verify Database

```bash
mysql -u root -p
mysql> SHOW DATABASES;
mysql> USE project_management;
mysql> SHOW TABLES;
mysql> EXIT
```

### Step 3: Backend Setup

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

4. Edit .env with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=project_management
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

5. Start backend server:
```bash
npm run dev
```

**Expected output**:
```
Server is running on port 5000
Database connection successful
```

### Step 4: Frontend Setup

Open a **new terminal** and:

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
# Create .env in frontend directory
echo REACT_APP_API_URL=http://localhost:5000/api > .env
```

Or manually create `.env` with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

**Expected output**:
- Browser opens to `http://localhost:3000`
- React app loads successfully

## Application Access

### Local URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **MySQL**: localhost:3306

### Test Account (Optional)

Create a test account through the registration form or use these SQL commands:

```sql
USE project_management;

-- Insert test user
INSERT INTO users (fullname, email, password, created_at)
VALUES (
  'Test User',
  'test@example.com',
  '$2a$10$...',  -- bcrypt hashed password for 'password123'
  NOW()
);
```

## First Steps

1. **Register**: Create a new account
   - Full Name: Your Name
   - Email: your@email.com
   - Password: At least 8 characters

2. **Login**: Login with your credentials

3. **Create Project**: 
   - Click "Create Project"
   - Fill in project details
   - Click "Create Project"

4. **Add Tasks**:
   - Click "View" on a project
   - Click "Add Task"
   - Fill in task details
   - Click "Create Task"

5. **Dashboard**: Monitor your progress

## Common Issues and Solutions

### Issue: MySQL Connection Failed

**Error**: `Client does not support authentication protocol requested by server`

**Solution**:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### Issue: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: Port 5000 Already in Use

**Error**: `Cannot bind to port 5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: npm install Fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: .env File Not Found

**Solution**:
Make sure .env file is in the correct directory:
- Backend: `backend/.env`
- Frontend: `frontend/.env`

And use proper syntax:
```
KEY=value
# Not: KEY = value (no spaces)
```

### Issue: Database Connection Error

**Solution**:
1. Verify MySQL is running
2. Check credentials in .env
3. Verify database name
4. Test connection:
```bash
mysql -h localhost -u root -p project_management
```

## Development Workflow

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
npm start
```

### Terminal 3: MySQL (Optional)
```bash
mysql -u root -p project_management
```

## API Testing

### Using Postman

1. Download [Postman](https://www.postman.com/)
2. Create new request
3. Test endpoints:

**Register**:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Login**:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Get Projects** (authenticated):
```
GET http://localhost:5000/api/projects
Authorization: Bearer <token>
```

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":"John","email":"john@example.com","password":"Password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'

# Get Projects (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer TOKEN"
```

## Building for Production

### Backend Build

```bash
cd backend
npm install --production
npm start
```

### Frontend Build

```bash
cd frontend
npm run build
```

This creates a `build` folder with optimized production files.

## Stopping the Application

### Stop Backend
- Press `Ctrl+C` in backend terminal

### Stop Frontend
- Press `Ctrl+C` in frontend terminal

### Stop MySQL
- **Windows**: `net stop MySQL80`
- **macOS**: `brew services stop mysql`
- **Linux**: `sudo systemctl stop mysql`

## Environment Variables Reference

### Backend (.env)

```
# Database Configuration
DB_HOST=localhost              # MySQL host
DB_USER=root                   # MySQL username
DB_PASSWORD=                   # MySQL password
DB_NAME=project_management     # Database name
DB_PORT=3306                   # MySQL port

# Server Configuration
PORT=5000                      # Server port
NODE_ENV=development           # Environment (development/production)

# JWT Configuration
JWT_SECRET=your_secret         # Secret key for JWT signing
JWT_EXPIRE=7d                  # Token expiration time

# CORS Configuration
FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS

# Rate Limiting
RATE_LIMIT_WINDOW_MS=15000     # Rate limit window (ms)
RATE_LIMIT_MAX_REQUESTS=100    # Max requests per window
```

### Frontend (.env)

```
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api  # Backend API URL
```

## Performance Tips

1. **Database**: Add indexes for frequently queried columns
2. **Backend**: Enable caching for frequently accessed data
3. **Frontend**: Use React DevTools to identify performance issues
4. **Network**: Check browser DevTools Network tab for slow requests

## Security Notes

1. **Never commit .env files** - Add to .gitignore
2. **Use strong passwords** - Minimum 8 characters
3. **Change JWT_SECRET** - In production, use a strong random string
4. **Enable HTTPS** - In production, always use HTTPS
5. **Update dependencies** - Run `npm update` regularly

## Next Steps

1. Read [README.md](./README.md) for project overview
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
3. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md) for database info
4. See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

## Getting Help

1. Check the documentation files
2. Review error messages in console
3. Check MySQL logs
4. Check Node.js error output
5. Review application source code

## Directory Structure Created

```
project-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── validations/
│   │   ├── config/
│   │   └── server.js
│   ├── database.sql
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── Documentation/
│   ├── README.md
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SETUP.md
│   ├── ER_DIAGRAM.md
│   └── DEPLOYMENT.md
│
└── INSTALLATION.md (this file)
```

## Support and Troubleshooting

For detailed troubleshooting:
1. Check backend README: `backend/README.md`
2. Check frontend README: `frontend/README.md`
3. Check deployment guide: `DEPLOYMENT.md`
4. Review API documentation: `API_DOCUMENTATION.md`

---

Congratulations! Your Project Management System is now running locally.

Happy coding!
