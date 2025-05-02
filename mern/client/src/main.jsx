import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import UserList from "./components/UserList";
import Profile from "./components/Profile";

import "./index.css";
import "./auth.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/users",
    element: <App />,
    children: [
      { index: true, element: <UserList /> },
      { path: ":id", element: <Profile /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
