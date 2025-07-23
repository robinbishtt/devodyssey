# DevOdyssey Client

The frontend React application for DevOdyssey - a modern blog platform built with React, Vite, and Tailwind CSS.

## Overview

This is the client-side application that provides the user interface for the DevOdyssey blog platform. Built with React 18 and powered by Vite for optimal development experience and performance.

## Technology Stack

- **React 18+** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management solution
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling and validation
- **React Query/TanStack Query** - Server state management (if implemented)

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: Reusable and accessible components
- **State Management**: Redux Toolkit for predictable state updates
- **Form Handling**: Robust form validation and submission
- **Route Protection**: Authentication-based route guards
- **SEO Optimization**: Meta tags and structured data
- **Performance**: Code splitting and lazy loading
- **Development Experience**: Hot reload and fast refresh

## Project Structure

```
client/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (Header, Footer, etc.)
│   │   ├── forms/          # Form components
│   │   └── ui/             # Base UI components (Button, Input, etc.)
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── Blog/
│   │   ├── Auth/
│   │   └── Dashboard/
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   └── index.js
│   ├── utils/              # Utility functions
│   ├── styles/             # Global styles and Tailwind imports
│   ├── constants/          # Application constants
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Application entry point
├── .env.example            # Environment variables example
├── .eslintrc.js            # ESLint configuration
├── .gitignore
├── index.html              # HTML template
├── package.json
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see [server README](../server/README.md))

### Installation

1. **Navigate to the client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the client directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=DevOdyssey
   VITE_NODE_ENV=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open <http://localhost:3000>

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier

## Configuration

### Vite Configuration

The `vite.config.js` file includes:

- React plugin for JSX support
- Path aliases for cleaner imports
- Development server configuration
- Build optimization settings

### Tailwind Configuration

The `tailwind.config.js` file includes:

- Custom color palette
- Extended spacing and typography
- Responsive breakpoints
- Dark mode support (if implemented)

### ESLint Configuration

The project uses ESLint with:

- React recommended rules
- React Hooks rules
- Custom rules for code consistency

## State Management

The application uses Redux Toolkit for state management with the following structure:

```javascript
store/
├── index.js                # Store configuration
├── slices/
│   ├── authSlice.js       # Authentication state
│   ├── blogSlice.js       # Blog posts state
│   ├── uiSlice.js         # UI state (modals, notifications)
│   └── userSlice.js       # User profile state
```

### Key Slices

- **Blog Slice**: Handles blog posts, categories, and search functionality
- **Interaction Slice**: Controls modals, notifications, and loading states
- **User Slice**: Manages user profile and settings

## Component Architecture

### Component Categories

1. **Pages**: Top-level route components
2. **Nested Pages**: Nested dashboard pages
3. **Common Components**: Shared across multiple pages (Header, Footer, Sidebar)
4. **UI Components**: Basic building blocks (Button, Input, Modal)

## Routing

The application uses React Router DOM for navigation:

```javascript
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}   # Check App.jsx for exact code structure
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run preview
```

## Build and Deployment

### Production Build

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Build Configuration

The build process includes:

- Code minification and compression
- CSS optimization and purging
- Asset optimization (images, fonts)
- Source map generation (for debugging)

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices and patterns
- Use TypeScript for type safety (if implemented)
- Implement proper error boundaries
- Use semantic HTML elements for accessibility

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes and commit
git add .
git commit -m "feat: add new blog card component"

# Push and create PR
git push origin feature/new-component
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**:

   ```bash
   # Change port in package.json or kill process
   npx kill-port 3000
   ```

2. **Module Not Found**:

   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Issues**:

   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

## Contributing

1. Follow the existing component and folder structure
2. Write meaningful component and variable names
3. Add PropTypes interfaces
4. Update documentation for new features
5. Test components across different screen sizes

## Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

---

For backend setup and API documentation, see the [server README](../server/README.md).
