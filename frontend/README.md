# Project Management System - Frontend

Modern, responsive React frontend for Project Management System with Tailwind CSS styling.

## Technology Stack

- **Framework**: React 18.2
- **Routing**: React Router 6.11
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 3.3
- **Build Tool**: Create React App

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── Navigation.jsx      # Top navigation bar
│   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   ├── Modal.jsx           # Reusable modal component
│   │   ├── UI.jsx              # UI utilities (Loading, Error, Empty States)
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── Dashboard.jsx       # Dashboard page
│   │   ├── Projects.jsx        # Projects list
│   │   ├── ProjectDetail.jsx   # Project detail view
│   │   ├── CreateProject.jsx   # Create project form
│   │   ├── EditProject.jsx     # Edit project form
│   │   ├── CreateTask.jsx      # Create task form
│   │   ├── EditTask.jsx        # Edit task form
│   │   └── Profile.jsx         # User profile
│   ├── services/
│   │   └── api.js              # API service with Axios
│   ├── styles/
│   │   └── index.css           # Global styles
│   ├── utils/
│   │   └── helpers.js          # Helper functions
│   ├── App.jsx                 # Main App component
│   └── index.js                # React entry point
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
└── README.md                   # This file
```

## Installation

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn

### Setup Steps

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables:
Create a `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

### Start Development Server
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production
```bash
npm build
```
Builds the app for production to the `build` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## Features

### Authentication
- User registration with email and password
- Secure login with JWT tokens
- Automatic token refresh
- Protected routes
- Logout functionality

### Project Management
- Create, read, update, delete projects
- Search projects by name
- Filter projects by status
- View project details
- Project status tracking

### Task Management
- Create tasks within projects
- Edit and delete tasks
- Task priority levels (Low, Medium, High)
- Task status tracking (Pending, In Progress, Completed)
- Task due dates
- Filter tasks by status and priority

### Dashboard
- Overview statistics
- Total projects and tasks count
- Completion rates
- Recent projects and tasks
- Task completion progress

### User Experience
- Responsive design (mobile-first)
- Clean, professional UI
- Loading states
- Error handling and messages
- Success notifications
- Empty states
- Accessible components

## Component Structure

### Layout Components
- **Navigation**: Top navigation bar with logout button
- **Sidebar**: Navigation menu with links to main pages
- **ProtectedRoute**: Wrapper for authenticated routes

### UI Components
- **Modal**: Confirmation dialogs
- **LoadingSpinner**: Loading indicator
- **LoadingCard**: Skeleton loading state
- **EmptyState**: No data message
- **ErrorMessage**: Error notification
- **SuccessMessage**: Success notification

### Pages
- **Login**: User login
- **Register**: User registration
- **Dashboard**: Statistics and overview
- **Projects**: Project management
- **Project Detail**: Individual project view
- **Create/Edit Project**: Project forms
- **Create/Edit Task**: Task forms
- **Profile**: User profile information

## API Integration

### Authentication
```javascript
authAPI.register(data)
authAPI.login(data)
authAPI.logout()
authAPI.getProfile()
```

### Projects
```javascript
projectAPI.getAll()
projectAPI.getById(id)
projectAPI.create(data)
projectAPI.update(id, data)
projectAPI.delete(id)
projectAPI.search(q)
projectAPI.filterByStatus(status)
```

### Tasks
```javascript
taskAPI.getByProjectId(projectId)
taskAPI.getById(projectId, id)
taskAPI.create(projectId, data)
taskAPI.update(projectId, id, data)
taskAPI.delete(projectId, id)
taskAPI.search(projectId, q)
taskAPI.filter(projectId, params)
```

### Dashboard
```javascript
dashboardAPI.getStats()
```

## Styling

### Tailwind CSS Classes Used
- Layout: `flex`, `grid`, `gap`, `p-*`, `m-*`
- Colors: `bg-*`, `text-*`, `border-*`
- States: `hover:*`, `focus:*`, `disabled:*`
- Responsive: `md:*`, `lg:*`
- Effects: `shadow`, `rounded`, `transition`

### Custom Tailwind Config
- Extended colors for primary and secondary
- Custom spacing values

## Responsive Design

### Mobile First Approach
- **Mobile**: Full-width single column
- **Tablet (768px+)**: Multi-column layouts
- **Desktop (1024px+)**: Full featured layouts

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Error Handling

The application handles errors gracefully:
1. Network errors are caught and displayed
2. API errors are formatted and shown to users
3. Expired tokens trigger re-authentication
4. Form validation errors are displayed

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Efficient re-renders with context
- Optimized API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Build for Production
```bash
npm build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
npm run build
# Deploy the 'build' folder to Netlify
```

### Configure Backend URL
Update `REACT_APP_API_URL` in `.env` to point to your production backend.

## Development Tips

1. **API Testing**: Use the browser DevTools Network tab
2. **Styling**: Check Tailwind CSS documentation
3. **State Management**: Use the AuthContext for global state
4. **Debugging**: Use React Developer Tools extension

## Contributing

1. Follow the existing component structure
2. Use consistent naming conventions
3. Add proper error handling
4. Test responsive design
5. Keep components reusable

## License

MIT
