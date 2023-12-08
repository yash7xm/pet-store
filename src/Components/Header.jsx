import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import "../assets/Styles/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const favs = useSelector((store) => store.fav.items);

  return (
    <nav>
      <Link className="custom-link" to="/">
        <div className="logo">Pet Store</div>
      </Link>
      <div className="features">
        <Link className="custom-link" to="/fav">
          <div className="fav">
            <FontAwesomeIcon icon={faHeart} />
            ({favs.length})
          </div>
        </Link>
        <div className="chats">
          <FontAwesomeIcon icon={faMessage} />
        </div>
        <Link className="custom-link" to="/auth">
          <div className="register">Log In</div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
