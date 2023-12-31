import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../assets/utils/favSlice";
import { Link } from "react-router-dom";

const Card = ({ animals }) => {
  const dispatch = useDispatch();
  const favs = useSelector((store) => store.fav.items);
  const isFav = favs.some((animal) => animal.id === animals.id);

  const handleFavClick = (event) => {
    event.preventDefault();
    if (!isFav) {
      dispatch(addFav(animals));
    } else {
      dispatch(removeFav(animals.id));
    }
  };

  return (
    <Link
      className="custom-link"
      to={`/pets/${animals.id}/${animals.species}/${animals.breed}`}
    >
      <div className="card">
        <div className="pet-img">
          <img src={animals.image} alt="" />
        </div>
        <div className="pet-bottom">
          <div className="pet-info">
            <div>{animals.species}</div>
            <div>{animals.breed}</div>
            <div>₹{animals.price}</div>
          </div>
          <div
            className="fav-btn"
            style={{ color: isFav ? "red" : "white" }}
            onClick={handleFavClick}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
