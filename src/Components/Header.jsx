import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeAuthStatus } from "../assets/utils/favSlice";

const Header = () => {
  const favs = useSelector((store) => store.fav.items);
  const authStatus = useSelector((store) => store.fav.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("user_Id");
    dispatch(changeAuthStatus());
  };

  useEffect(() => {
    if (Cookies.get("user_Id")) {
      dispatch(changeAuthStatus());
    }
  }, []);

  return (
    <nav>
      <Link className="custom-link" to="/">
        <div className="logo">Pet Store</div>
      </Link>
      {console.log(authStatus)}
      <div className="features">
        <Link className="custom-link" to="/fav">
          <div className="fav">
            <FontAwesomeIcon icon={faHeart} />({favs.length})
          </div>
        </Link>
        <Link className="custom-link" to='/chat'>
          <div className="chats">
            <FontAwesomeIcon icon={faMessage} />
          </div>
        </Link>
        <Link
          className="custom-link"
          to={authStatus ? "/" : "/auth"}
          onClick={authStatus ? handleLogout : null}
        >
          <div className="register">{authStatus ? "Logout" : "Login"}</div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
