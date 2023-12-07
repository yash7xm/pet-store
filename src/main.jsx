import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./Components/Header.jsx";
import Display from "./Components/Display.jsx";
import Auth from "./Components/Auth.jsx";
import Fav from "./Components/Fav.jsx";
import ExpandPets from "./Components/ExpandPets.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./assets/utils/appStore.js";

const App = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Display />,
      },
      {
        path: "/fav",
        element: <Fav />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/pets/:id/:species/:breed",
        element: <ExpandPets />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
