import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/index.css';

import AdminDashboardPage from '@/pages/admin/dashboard';
import AdminEmployeeManagementPage from '@/pages/admin/employee-management/home';
import ErrorPage from '@/pages/error';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import reportWebVitals from '@/reportWebVitals';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboardPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/admin/employee-management',
        element: <AdminEmployeeManagementPage />,
        errorElement: <ErrorPage />,
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
