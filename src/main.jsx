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
import { useEffect } from "react";
import Chats from "./Components/Chats.jsx";

const App = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'hello' }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        console.log('Fine');
      } catch (error) {
        console.error('There was a problem with the fetch request:', error);
      }
    };
  
    fetchData();
  }, []);
  

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
      {
        path: "/chat/:id",
        element: <Chats />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
