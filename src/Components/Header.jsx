import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/">
        <div className="logo">Pet Store</div>
      </Link>
      <div className="features">
        <Link to="/fav">
          <div className="fav">
            <FontAwesomeIcon icon={faHeart} />
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
