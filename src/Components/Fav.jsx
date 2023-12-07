import { useSelector } from "react-redux";
import Card from "./Card";
import "../assets/Styles/Fav.css";

const Fav = () => {
  const favs = useSelector((store) => store.fav.items);

  return (
    <div className="fav-display">
      <div className="cards-container">
        {favs.map((animal, index) => (
          <Card key={index} animals={animal} />
        ))}
      </div>
    </div>
  );
};

export default Fav;
