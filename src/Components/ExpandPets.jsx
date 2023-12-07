import { useParams } from "react-router-dom";
import "../assets/Styles/ExpandPets.css";
import animals from "../assets/utils/animals";

const ExpandPets = () => {
  const { id } = useParams();
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
          <button className="enquiry-btn">Enquiry</button>
        </div>
      </div>
    </div>
  );
};

export default ExpandPets;
