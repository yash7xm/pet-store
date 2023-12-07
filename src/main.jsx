import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./Components/Header.jsx";
import Display from "./Components/Display.jsx";
import Fav from "./Components/Fav.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Display />
      },
      {
        path: '/fav',
        element: <Fav />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
