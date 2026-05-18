# Student Dashboard Frontend

A simple React-based frontend for the Student Dashboard application.

## Features

- **Authentication**: Login, Register, Forgot Password
- **Dashboard**: View study statistics and recent activities
- **Journal Management**: Create, edit, delete, and search study entries
- **Profile Management**: Update profile information and change password
- **Simple Design**: Built with Tailwind CSS

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Backend Configuration**
   - Make sure your backend is running on `http://localhost:3000`
   - The frontend will run on `http://localhost:3001`

## Simple Structure

```
src/
├── components/          # Reusable components
├── context/            # Authentication context
├── pages/              # Main pages
├── App.jsx             # Main app component
└── index.js            # Entry point
```

## API Integration

Uses axios for simple API calls to:
- `/api/auth/*` - Authentication
- `/api/dashboard/*` - Dashboard data
- `/api/journal/*` - Journal management
- `/api/profile/*` - Profile management

## Technologies

- React 18
- React Router DOM
- Axios
- Tailwind CSS