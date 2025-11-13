import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { changeAuthStatus, setFavorites } from "../assets/utils/favSlice";

const BACKEND_URL = "http://localhost:8000/api";

const Header = () => {
    const favs = useSelector((store) => store.fav.items);
    const authStatus = useSelector((store) => store.fav.loggedIn);

    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");

    const dispatch = useDispatch();

    const decodeJWT = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload;
        } catch {
            return null;
        }
    };

    const handleLogout = () => {
        Cookies.remove("jwt");
        dispatch(changeAuthStatus(false)); // LOGOUT instantly
        setUserEmail("");
        setUserRole("");
    };

    // On page load → restore login
    useEffect(() => {
        const token = Cookies.get("jwt");
        if (token) {
            const user = decodeJWT(token);
            if (user) {
                dispatch(changeAuthStatus(true)); // login instantly
                setUserEmail(user.email);
                setUserRole(user.role);
            }
        }
    }, []);

    // Load favorites on login
    useEffect(() => {
        const token = Cookies.get("jwt");
        if (!token || !authStatus) return;

        const user = decodeJWT(token);
        if (user) {
            setUserEmail(user.email);
            setUserRole(user.role);
        }

        const loadFavorites = async () => {
            const res = await fetch(`${BACKEND_URL}/favorites`, {
                headers: { "x-access-token": token },
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(setFavorites(data.data));
            }
        };

        loadFavorites();
    }, [authStatus]);

    return (
        <nav>
            <Link className="custom-link" to="/">
                <div className="logo">Pet Store</div>
            </Link>

            <div className="features">
                <Link className="custom-link" to="/favorites">
                    <div className="fav">
                        <FontAwesomeIcon icon={faHeart} />({favs.length})
                    </div>
                </Link>

                <Link className="custom-link" to="/chat/100">
                    <div className="chats">
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                </Link>

                {authStatus && userRole === "seller" && (
                    <Link className="custom-link" to="/post-pet">
                        <button className="post-btn">Post Pet</button>
                    </Link>
                )}

                {authStatus ? (
                    <div className="auth-container">
                        <span className="username">Hello, {userEmail}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-container">
                        <Link className="custom-link" to="/auth">
                            <button className="login-btn">Login</button>
                        </Link>
                        <Link className="custom-link" to="/auth">
                            <button className="signup-btn">Signup</button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
