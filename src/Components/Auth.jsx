import { useState } from "react";
import "../assets/Styles/Auth.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeAuthStatus } from "../assets/utils/favSlice";

const BACKEND_URL = "http://localhost:8000/api/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer");
    const [regMode, setRegMode] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        setErrorMsg("");

        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();

        if (!response.ok) {
            setErrorMsg(data.error || "Registration failed");
            return;
        }

        const loginRes = await fetch(`${BACKEND_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            Cookies.set("jwt", loginData.data.token, { expires: 7 });
            dispatch(changeAuthStatus(true));
            navigate("/");
        } else {
            setErrorMsg("Registered, but login failed");
        }
    };

    const handleLogin = async () => {
        setErrorMsg("");

        const response = await fetch(`${BACKEND_URL}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setErrorMsg(data.error || "Invalid email or password");
            return;
        }

        Cookies.set("jwt", data.data.token, { expires: 7 });

        dispatch(changeAuthStatus(true));
        navigate("/");
    };

    const handleAuth = () => {
        if (!email || !password) {
            setErrorMsg("Email & Password required");
            return;
        }

        if (regMode) handleRegister();
        else handleLogin();
    };

    return (
        <div className="auth-wrapper">
            <div className="auth">
                <div className="heading">{regMode ? "Register" : "Login"}</div>

                {/* EMAIL */}
                <div className="uname">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Enter email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="pass">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* ROLE SELECTOR (only for registration) */}
                {regMode && (
                    <div className="role">
                        <label>User Type:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>
                )}

                {/* ERROR MESSAGE */}
                {errorMsg && <p className="error">{errorMsg}</p>}

                {/* MAIN BUTTON */}
                <div className="auth-btn" onClick={handleAuth}>
                    {regMode ? "Register" : "Login"}
                </div>

                {/* FOOTER SWITCH */}
                <div
                    className="footer"
                    onClick={() => {
                        setRegMode(!regMode);
                        setErrorMsg("");
                        setEmail("");
                        setPassword("");
                    }}
                >
                    {regMode
                        ? "Already have an account? Login"
                        : "Create an Account"}
                </div>
            </div>
        </div>
    );
};

export default Auth;
