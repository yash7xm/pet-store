import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ animals }) => {
  return (
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
        <div className="fav-btn">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
