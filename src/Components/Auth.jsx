import { useState } from "react";
import "../assets/Styles/Auth.css";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regMode, setRegMode] = useState(false);

  const handleRegisterBtn = () => {
    setRegMode((prevState) => !prevState);
  };

  const handleAuthBtn = async () => {
    if (username.length == 0) {
      document.querySelector(".uname input").placeholder =
        "Enter valid username";
    }
    if (password.length == 0) {
      document.querySelector(".pass input").placeholder =
        "Enter valid password";
    }
    if (username.length != 0 && password.length != 0) {
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
          throw new Error("Did not created the user");
        } else console.log("created");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth">
        <div className="heading">{regMode ? "Register" : "LogIn"}</div>
        <div className="uname">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="pass">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="auth-btn" onClick={handleAuthBtn}>
          {regMode ? "Register" : "LogIn"}
        </div>
        <div className="footer" onClick={handleRegisterBtn}>
          {regMode ? "Already a user" : "Create Account"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
