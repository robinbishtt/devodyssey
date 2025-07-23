import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import { store } from "./store/store.js";

import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import AllBlogs from './pages/AllBlogs.jsx';
import Blog from './pages/Blog.jsx';
import AuthorPage from './pages/AuthorPage.jsx';

import ProtectedRoute from './components/ProtectedRoutes.jsx';
import Write from './pages/Write.jsx';
import DashboardLayout from './pages/dashboard/dashboardLayout.jsx';

import AnalyticsPage from './pages/dashboard/nestedPages/analyticsPage.jsx';
import ProfilePage from './pages/dashboard/nestedPages/profilePage.jsx';
import SettingsPage from './pages/dashboard/nestedPages/settingsPage.jsx';
import MyBlogsPage from './pages/dashboard/nestedPages/myBlogsPage';


import "./App.css";
import UserProfile from "./pages/UserProfile.jsx";
import EditBlog from "./pages/EditBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Home", element: <Home /> },
      { path: "/Login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
      { path: "/AllBlogs", element: <AllBlogs /> },
      { path: "/blogs/:blogTitle", element: <Blog /> },
      { path: "/author/:username", element: <AuthorPage /> },
      {
        path: "/Write",
        element: (
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "/Dashboard", element: <ProfilePage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "myblogs", element: <MyBlogsPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "edit/:blogId", element: <EditBlog /> },
        ],
      },
      {
        path: "/userProfile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
