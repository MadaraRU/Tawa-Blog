import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { queryClient } from './react-query/queryClient';
import App from './App.jsx';
import './assets/bootstrap.min.css';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MainPage from './pages/MainPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import PrivateRoute from './pages/PrivateRoute';
import ProfileDetailsPage from './pages/ProfileDetailsPage';

import UserBlogPostsPage from './pages/UserBlogPostsPage';
import AddBlogPostPage from './pages/AddBlogPostPage';
import BlogPage from './pages/BlogPage';
import EditBlogPostPage from './pages/EditBlogPostPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index element={<MainPage />} />{' '}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/blog/:id/edit-post" element={<EditBlogPostPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile" index element={<ProfileDetailsPage />} />
          <Route path="/profile/posts" element={<UserBlogPostsPage />} />
        </Route>
        <Route path="/add-post" element={<AddBlogPostPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
