import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Card from "./Card";
import "../assets/Styles/Fav.css";
import { setFavorites } from "../assets/utils/favSlice";

const BACKEND_URL = "http://localhost:8000/api";

const Fav = () => {
    const dispatch = useDispatch();
    const favs = useSelector((store) => store.fav.items);
    const token = Cookies.get("jwt");

    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!token) return;

        const response = await fetch(`${BACKEND_URL}/favorites`, {
            method: "GET",
            headers: {
                "x-access-token": token,
            },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(setFavorites(data.data)); // store in redux
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (!token)
        return (
            <h2 style={{ textAlign: "center" }}>
                Please login to view favorites
            </h2>
        );

    if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

    if (favs.length === 0)
        return <h2 style={{ textAlign: "center" }}>No favorites yet ❤️</h2>;

    return (
        <div className="fav-display">
            <div className="cards-container">
                {favs.map((animal) => (
                    <Card key={animal._id} animals={animal} />
                ))}
            </div>
        </div>
    );
};

export default Fav;
