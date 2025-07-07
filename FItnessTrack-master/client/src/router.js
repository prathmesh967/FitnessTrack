import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Nutrition from "./pages/Nutrition";
import Goals from "./pages/Goals";
import Tutorials from "./pages/Tutorials";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <>
      <Navbar theme={theme} themeToggler={themeToggler} />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "workout", element: <Workout /> },
        { path: "profile", element: <Profile /> },
        { path: "nutrition", element: <Nutrition /> },
        { path: "goals", element: <Goals /> },
        { path: "tutorials", element: <Tutorials /> },
        { path: "progress", element: <Progress /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
); 