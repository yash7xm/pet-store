import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Card from "./Card";
import "../assets/Styles/Fav.css";
import { setFavorites, removeFav } from "../assets/utils/favSlice";
import { BACKEND_URL } from "../config";

const Fav = () => {
    const dispatch = useDispatch();
    const favs = useSelector((store) => store.fav.items);
    const authStatus = useSelector((store) => store.fav.loggedIn);

    const token = Cookies.get("jwt");
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        const response = await fetch(`${BACKEND_URL}/favorites`, {
            method: "GET",
            headers: {
                "x-access-token": token,
            },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(setFavorites(data.data));
        }

        setLoading(false);
    };

    // Load favorites on login or refresh
    useEffect(() => {
        fetchFavorites();
    }, [token, authStatus]);

    const handleRemove = async (petId) => {
        if (!token) return;

        const res = await fetch(`${BACKEND_URL}/favorites/${petId}`, {
            method: "DELETE",
            headers: {
                "x-access-token": token,
            },
        });

        if (res.ok) {
            dispatch(removeFav(petId));
        }
    };

    // UI Messages
    if (!token)
        return (
            <h2 className="center-msg">Please login to view favorites ❤️</h2>
        );

    if (loading)
        return <h2 className="center-msg">Loading your favorites...</h2>;

    if (favs.length === 0)
        return <h2 className="center-msg">No favorites yet ❤️</h2>;

    return (
        <div className="fav-display">
            <div className="cards-container">
                {favs.map((pet) => (
                    <div className="fav-card-wrapper" key={pet._id}>
                        {/* Original card */}
                        <Card animals={pet} />

                        {/* REMOVE BUTTON */}
                        <button
                            className="remove-fav-btn"
                            onClick={() => handleRemove(pet._id)}
                        >
                            Remove ❤️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Fav;
