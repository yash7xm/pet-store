import { useParams } from "react-router-dom";
import "../assets/Styles/ExpandPets.css";
import animals from "../assets/utils/animals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ExpandPets = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToPrevPage = () => {
    navigate(-1);
  };

  return (
    <div className="exp-wrapper">
      <div className="exp">
        <div className="main-img">
          <img src={animals[id].image} alt="" />
        </div>
        <div className="info">
          <div className="species">{animals[id].species}</div>
          <div className="breed">{animals[id].breed}</div>
          <div className="desc">{animals[id].description}</div>
          <div className="price">₹{animals[id].price}</div>
          <Link className="custom-link" to={`/chat/${animals[id].id}`}>
            <button className="enquiry-btn">Enquiry</button>
          </Link>
          <div className="prev-btn" onClick={goToPrevPage}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandPets;
