# Task Management System - Frontend

A modern React application for managing tasks with authentication, filtering, and statistics.

## Features

- User Authentication: Register, login, and logout with JWT tokens
- Task Management: Create, read, update, and delete tasks
- Task Filtering: Filter by status, priority, and search by title/description
- Dashboard: View task statistics and completion rates
- Responsive Design: Mobile-friendly interface
- Real-time Updates: Toast notifications for user feedback

## Tech Stack

- React 18
- React Router DOM
- Axios for API calls
- React Icons
- React Toastify
- Tailwind CSS
- Date-fns for date formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   └── Tasks/
│       ├── TaskForm.jsx
│       ├── TaskItem.jsx
│       ├── TaskList.jsx
│       └── TaskFilters.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js
├── App.jsx
├── index.js
└── index.css
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App

## API Integration

The frontend communicates with the backend through the following endpoints:

- Authentication: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Tasks: `/api/tasks` (GET, POST), `/api/tasks/:id` (GET, PUT, DELETE)
- Statistics: `/api/tasks/stats`

## Features in Detail

### Authentication
- JWT-based authentication
- Protected routes
- Automatic token refresh
- Logout functionality

### Task Management
- Create tasks with title, description, priority, status, and due date
- Edit existing tasks
- Delete tasks with confirmation
- Change task status inline
- Filter and search tasks

### Dashboard
- Task statistics overview
- Completion rate visualization
- Tasks breakdown by priority and status
- Real-time data updates

## Styling

The application uses Tailwind CSS for styling with custom configurations for:
- Color schemes
- Animations
- Responsive design
- Custom utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
