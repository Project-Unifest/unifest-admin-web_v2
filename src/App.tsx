import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./pages/MainPage";
import axios from "axios";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
