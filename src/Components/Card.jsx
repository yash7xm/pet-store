import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../assets/utils/favSlice";
import { useEffect, useState } from "react";


const Card = ({ animals }) => {

  const dispatch = useDispatch();
  const favs = useSelector((store) => store.fav.items);
  const isFav = favs.some(animal => animal.id === animals.id);

  useEffect(() => {
    setColor(isFav);
  }, [isFav]);

  const [color, setColor] = useState(isFav);

  const handleFavClick = () => {
    if (!color) {
      dispatch(addFav(animals));
      setColor(true); 
    } else {
      console.log(animals.id);
      dispatch(removeFav(animals.id));
      console.log(favs);
      setColor(false); 
    }
  };
  
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
        <div className="fav-btn" 
        style = {{color: color ? 'red' : 'white'}}
        onClick={handleFavClick}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
