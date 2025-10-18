# Task Manager

A simple task management application built with React and Node.js. Users can create, update, and delete tasks with authentication.

## What This Application Does

- User registration and login with JWT tokens
- Create tasks with title, description, priority, and due date
- Update task status and details
- Delete tasks
- View task statistics on dashboard
- Filter tasks by status and priority

## Technologies Used

Frontend: React, React Router, Axios, Tailwind CSS
Backend: Node.js, Express, MongoDB, JWT authentication
Database: MongoDB

## Prerequisites

Before running this application, make sure you have:

- Node.js installed (version 14 or higher)
- MongoDB running on your system
- npm or yarn package manager

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd task-manager
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Set Up Environment Variables

Create a file named `.env` in the backend folder with the following content:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
```

Replace `your_secret_key_here` with a strong secret key for JWT tokens.

### Step 5: Start MongoDB

Make sure MongoDB is running on your system. If you have MongoDB installed locally, start it with:

```bash
mongod
```

Or use MongoDB Atlas for cloud database.

## Running the Application

### Step 1: Start the Backend Server

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm run dev
```

The backend server will start on http://localhost:5000

### Step 2: Start the Frontend Application

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
npm start
```

The frontend application will start on http://localhost:3000

### Step 3: Access the Application

Open your web browser and go to http://localhost:3000

## How to Use the Application

### First Time Setup

1. Click on "Create one here" to register a new account
2. Fill in your name, email, and password
3. Click "Create Account"
4. You will be automatically logged in

### Using the Dashboard

1. After login, you will see the dashboard with statistics
2. Click "New Task" to create a new task
3. Fill in task details:
   - Title (required)
   - Description
   - Priority (High, Medium, Low)
   - Status (Todo, In Progress, Completed)
   - Due Date (optional)
4. Click "Create Task"

### Managing Tasks

- View all your tasks on the dashboard
- Click on a task to edit it
- Change task status by clicking the status dropdown
- Delete tasks by clicking the delete button
- Use filters to view tasks by status or priority

### Logging Out

Click the "Logout" button in the top right corner to sign out.

## API Endpoints

The backend provides the following API endpoints:

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- GET /api/auth/verify - Verify JWT token

### Tasks
- GET /api/tasks - Get all tasks for user
- POST /api/tasks - Create new task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task
- GET /api/tasks/stats - Get task statistics

## Troubleshooting

### Common Issues

1. **Cannot connect to database**
   - Make sure MongoDB is running
   - Check the MONGODB_URI in your .env file

2. **Authentication errors**
   - Clear browser localStorage
   - Check if JWT_SECRET is set in .env file

3. **Port already in use**
   - Change the PORT in .env file
   - Kill any process using the port

4. **Frontend not loading**
   - Make sure backend is running on port 5000
   - Check browser console for errors

### Development Tips

- Use browser developer tools to debug issues
- Check terminal for error messages
- Ensure both frontend and backend are running
- Clear browser cache if experiencing issues

## File Structure

```
task-manager/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── README.md
```

## Production Deployment

For production deployment:

1. Set NODE_ENV=production in .env
2. Use a production MongoDB instance
3. Set strong JWT_SECRET
4. Build frontend with `npm run build`
5. Deploy to hosting service like Heroku, Vercel, or Netlify

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check environment variables are set correctly

For additional help, refer to the application logs or contact the development team.
