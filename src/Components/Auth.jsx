import { useState } from "react";
import "../assets/Styles/Auth.css";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regMode, setRegMode] = useState(false);

  const handleRegisterBtn = () => {
    setRegMode((prevState) => !prevState);
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
        <div className="auth-btn">{regMode ? "Register" : "LogIn"}</div>
        <div className="footer" onClick={handleRegisterBtn}>
          {regMode ? "Already a user" : "Create Account"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
