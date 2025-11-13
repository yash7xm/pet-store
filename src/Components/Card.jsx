import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../assets/utils/favSlice";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../config";

const Card = ({ animals }) => {
    const dispatch = useDispatch();
    const favs = useSelector((store) => store.fav.items);

    // Check if this pet is already in user's favorite list
    const isFav = favs.some((pet) => pet._id === animals._id);

    const handleFavClick = async (e) => {
        e.preventDefault(); // prevent navigation when heart is clicked

        const token = Cookies.get("jwt");
        if (!token) {
            alert("Please login to add favorites");
            return;
        }

        if (!isFav) {
            // ➤ ADD TO FAVORITES
            const res = await fetch(`${BACKEND_URL}/favorites/${animals._id}`, {
                method: "POST",
                headers: {
                    "x-access-token": token,
                },
            });

            if (res.ok) {
                dispatch(addFav(animals));
            }
        } else {
            // ➤ REMOVE FROM FAVORITES
            const res = await fetch(`${BACKEND_URL}/favorites/${animals._id}`, {
                method: "DELETE",
                headers: {
                    "x-access-token": token,
                },
            });

            if (res.ok) {
                dispatch(removeFav(animals._id));
            }
        }
    };

    return (
        <Link
            className="custom-link"
            to={`/pets/${animals._id}/${animals.species}/${animals.breed}`}
        >
            <div className="card">
                {/* PET IMAGE */}
                <div className="pet-img">
                    <img src={animals.images?.[0]} alt={animals.breed} />
                </div>

                {/* BOTTOM INFO */}
                <div className="pet-bottom">
                    <div className="pet-info">
                        <div>{animals.species}</div>
                        <div>{animals.breed}</div>
                        <div>₹{animals.price}</div>
                    </div>

                    {/* FAVORITE BUTTON */}
                    <div
                        className="fav-btn"
                        onClick={handleFavClick}
                        style={{
                            color: isFav ? "red" : "white",
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
