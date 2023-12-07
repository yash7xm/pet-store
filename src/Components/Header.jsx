import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const favs = useSelector((store) => store.fav.items);

  return (
    <nav>
      <Link to="/">
        <div className="logo">Pet Store</div>
      </Link>
      <div className="features">
        <Link to="/fav">
          <div className="fav">
            <FontAwesomeIcon icon={faHeart} />
            {favs.length}
          </div>
        </Link>
        <div className="chats">
          <FontAwesomeIcon icon={faMessage} />
        </div>
        <div className="auth">Log In</div>
      </div>
    </nav>
  );
};

export default Header;
