import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./Components/Header.jsx";
import Display from "./Components/Display.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Display />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
