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
import PostPet from "./Components/PostPet.jsx";
import { BACKEND_URL } from "./config.js";

const App = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/info`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                console.log("Backend is alive");
            } catch (error) {
                console.error(
                    "There was a problem with the fetch request:",
                    error
                );
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
                path: "/favorites",
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
                element: <Chats />,
            },
            {
                path: "/post-pet",
                element: <PostPet />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={appRouter} />
);
