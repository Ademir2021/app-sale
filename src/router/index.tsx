import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';
import Login from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Sale from '../pages/Sale';
import Address from '../pages/Address';
import Person from '../pages/Person';
import CloseOrder from '../pages/CloseOrder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      }, {
        path: 'sale',
        element: (
          <ProtectedRoute>
            <Sale />
          </ProtectedRoute>
        )
      }, {
        path: 'address',
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        )
      }, {
        path: 'person',
        element: (
          <ProtectedRoute>
            <Person />
          </ProtectedRoute>
        )
      },{
        path:'close_order',
        element:(
          <ProtectedRoute>
            <CloseOrder/>
          </ProtectedRoute>
        )
      },{
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;


