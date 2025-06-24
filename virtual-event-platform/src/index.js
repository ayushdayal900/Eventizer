import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Meeting from './meeting.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

const payload = {
  sdkKey: "rAv_eE0WQXeVwuKknVbnSQ",
  sdkSecret: "QjEX2B1ppWhs6W127324v8KE736BV7WB",
  meetingNumber: "89753305986",
  role: 0,
  userName: "Eventizer User",
  userEmail: "user@example.com",
  password: "1rn4rV",
  leaveUrl: "http://localhost:3000/meeting"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const router = createBrowserRouter([
//   // {
//   //   path: '/meeting',
//   //   element: <Meeting payload={payload} />
//   // }
// ]);
root.render(
  <RouterProvider router={router} />
);
reportWebVitals();