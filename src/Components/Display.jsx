import { useEffect, useState } from "react";
import "../assets/Styles/Display.css";
import Card from "./Card";

const BACKEND_URL = "https://storex-hf5s.onrender.com/api";

const Display = () => {
    const [pets, setPets] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);

    // FETCH PETS
    const fetchPets = async () => {
        const response = await fetch(
            `${BACKEND_URL}/pets?page=${page}&limit=20`
        );
        const data = await response.json();

        if (response.ok) {
            setPets(data.data);
            setFilteredData(data.data);
        }
    };

    useEffect(() => {
        fetchPets();
    }, [page]);

    // CATEGORY FILTER
    const handleCategory = (type) => {
        if (type === "All") {
            setFilteredData(pets);
            return;
        }

        setFilteredData(
            pets.filter((p) => p.species.toLowerCase() === type.toLowerCase())
        );
    };

    // SEARCH BY BREED
    const handleSearch = () => {
        setFilteredData(
            pets.filter((p) =>
                p.breed.toLowerCase().includes(searchInput.toLowerCase())
            )
        );
    };

    // SORT BY PRICE
    const handleFilter = () => {
        const sortedArr = [...filteredData];
        sortedArr.sort((a, b) => a.price - b.price);
        setFilteredData(sortedArr);
    };

    return (
        <div className="display">
            <div className="sort">
                <div className="search">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="filter">
                    <button onClick={handleFilter}>Filter</button>
                </div>
            </div>

            {/* CATEGORY BUTTONS */}
            <div className="category">
                <button onClick={() => handleCategory("All")}>All</button>
                <button onClick={() => handleCategory("Dog")}>Dogs</button>
                <button onClick={() => handleCategory("Cat")}>Cats</button>
                <button onClick={() => handleCategory("Rabbit")}>
                    Rabbits
                </button>
                <button onClick={() => handleCategory("Parrot")}>
                    Parrots
                </button>
            </div>

            {/* PET CARDS */}
            <div className="cards-container">
                {filteredData.map((animal) => (
                    <Card key={animal._id} animals={animal} />
                ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Prev
                </button>
                <span>Page: {page}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Display;
