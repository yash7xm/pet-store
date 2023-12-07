import { useState } from "react";
import "../assets/Styles/Display.css";
import animals from "../assets/utils/animals";
import Card from "./Card";

const Display = () => {
  const [filteredData, setFilteredData] = useState(animals);

  const handleCategory = (type) => {
    console.log(type);
    if (type == "All") {
      setFilteredData(animals);
      return;
    }
    let newArr = [];
    for (let i = 0; i < animals.length; i++) {
      if (animals[i].species == type) {
        newArr.push(animals[i]);
      }
    }
    console.log(newArr);
    setFilteredData(newArr);
  };

  return (
    <div className="display">
      <div className="sort">
        <div className="search">
          <input type="text" />
          <button>Search</button>
        </div>
        <div className="filter">
          <button>Filter</button>
        </div>
      </div>
      <div className="category">
        <button onClick={() => handleCategory("All")}>All</button>
        <button onClick={() => handleCategory("Dog")}>Dogs</button>
        <button onClick={() => handleCategory("Cat")}>Cats</button>
        <button onClick={() => handleCategory("Lion")}>Lions</button>
      </div>
      <div className="cards-container">
        {filteredData.map((animal, index) => (
          <Card key={index} animals={animal} />
        ))}
      </div>
    </div>
  );
};

export default Display;
