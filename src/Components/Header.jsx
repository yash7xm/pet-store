import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { changeAuthStatus, setFavorites } from "../assets/utils/favSlice";

const BACKEND_URL = "http://localhost:8000/api";

const Header = () => {
    const favs = useSelector((store) => store.fav.items);
    const authStatus = useSelector((store) => store.fav.loggedIn);

    const dispatch = useDispatch();

    const handleLogout = () => {
        Cookies.remove("jwt"); // FIXED
        dispatch(changeAuthStatus()); // sets loggedIn = false
    };

    useEffect(() => {
        if (Cookies.get("jwt")) {
            dispatch(changeAuthStatus()); // sets loggedIn = true
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get("jwt");
        if (!token) return;

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
                {/* FAVORITES */}
                <Link className="custom-link" to="/favorites">
                    <div className="fav">
                        <FontAwesomeIcon icon={faHeart} />({favs.length})
                    </div>
                </Link>

                {/* CHAT PLACEHOLDER */}
                <Link className="custom-link" to="/chat/100">
                    <div className="chats">
                        <FontAwesomeIcon icon={faMessage} />
                    </div>
                </Link>

                {/* LOGIN / LOGOUT */}
                <Link
                    className="custom-link"
                    to={authStatus ? "/" : "/auth"}
                    onClick={authStatus ? handleLogout : undefined}
                >
                    <div className="register">
                        {authStatus ? "Logout" : "Login"}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Header;
