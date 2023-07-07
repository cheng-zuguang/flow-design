import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// import App from '';
import { Home } from '@/home';
import NotFound404 from '../404Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
    ]
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

export default router;
