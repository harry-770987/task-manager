# Task Management System - Quick Setup Guide

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📋 Features Implemented

✅ **User Authentication**
- User registration with email and password
- User login with JWT token authentication
- Protected routes (both frontend and backend)
- Logout functionality

✅ **Task Management**
- Create Task: Title, description, priority (Low/Medium/High), due date, status (Todo/In Progress/Completed)
- View Tasks: Display all tasks in a list/grid view
- Update Task: Edit task details and change status
- Delete Task: Remove tasks
- Filter Tasks: By status and priority
- Search: Search tasks by title or description

✅ **Dashboard**
- Display task statistics:
  - Total tasks
  - Completed tasks
  - Pending tasks
  - Tasks by priority breakdown
  - Tasks by status breakdown
  - Completion rate visualization

✅ **Technical Requirements**
- Input validation using express-validator
- Password hashing with bcryptjs
- JWT authentication middleware
- Error handling middleware
- MongoDB indexes for performance
- CORS configuration
- React Router for navigation
- Context API for state management
- Form validation
- Loading states and error handling
- Responsive design (mobile-friendly)
- Toast notifications for success/error messages
- Protected routes (redirect to login if not authenticated)

## 🗂 Project Structure

```
task manager/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── Dashboard/
    │   │   │   └── Dashboard.jsx
    │   │   ├── Layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── PrivateRoute.jsx
    │   │   └── Tasks/
    │   │       ├── TaskForm.jsx
    │   │       ├── TaskItem.jsx
    │   │       ├── TaskList.jsx
    │   │       └── TaskFilters.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    ├── public/index.html
    ├── package.json
    └── tailwind.config.js
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks (with filtering)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## 🎯 How to Use

1. **Start the application** by running both backend and frontend servers
2. **Register a new account** or login with existing credentials
3. **Create tasks** using the "Add Task" button
4. **Manage tasks** by editing, deleting, or changing status
5. **Filter and search** tasks using the filter panel
6. **View statistics** on the dashboard

## 🚨 Important Notes

- Make sure MongoDB is running on your system
- Update the JWT_SECRET in production
- The application uses CORS for cross-origin requests
- All task operations require authentication
- The frontend automatically redirects to login if not authenticated

## 🐛 Troubleshooting

- **Backend not starting**: Check if MongoDB is running and the connection string is correct
- **Frontend not connecting**: Verify the API URL in the frontend .env file
- **Authentication issues**: Check if JWT_SECRET is set in backend .env file
- **Database connection**: Ensure MongoDB is accessible and the database name is correct
