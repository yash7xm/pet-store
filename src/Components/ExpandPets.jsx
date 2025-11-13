import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/Styles/ExpandPets.css";

const BACKEND_URL = "http://localhost:8000/api";

const ExpandPets = () => {
    const { id } = useParams(); // MongoDB _id
    const navigate = useNavigate();

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    const goToPrevPage = () => navigate(-1);

    // Fetch pet by ID
    const fetchPet = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/pets/${id}`);
            const data = await res.json();

            if (res.ok) {
                setPet(data.data); // backend sends `data`
            }
        } catch (err) {
            console.log("Error fetching pet:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPet();
    }, []);

    if (loading) return <h2 className="loading">Loading...</h2>;

    if (!pet) return <h2 className="error">Pet not found or removed.</h2>;

    return (
        <div className="exp-wrapper">
            <div className="exp">
                {/* MAIN IMAGE */}
                <div className="main-img">
                    <img src={pet.images?.[0]} alt={pet.breed} />
                </div>

                {/* INFO SECTION */}
                <div className="info">
                    <div className="species">{pet.species}</div>
                    <div className="breed">{pet.breed}</div>

                    {pet.age && <div className="age">Age: {pet.age} years</div>}

                    {pet.gender && (
                        <div className="gender">Gender: {pet.gender}</div>
                    )}

                    {pet.location && (
                        <div className="location">
                            Location: {pet.location.city}, {pet.location.state}
                        </div>
                    )}

                    <div className="desc">{pet.description}</div>
                    <div className="price">₹{pet.price}</div>

                    {/* ENQUIRY BUTTON */}
                    <Link
                        className="custom-link"
                        to={`/chat/${pet.postedBy?._id}`}
                    >
                        <button className="enquiry-btn">Enquiry</button>
                    </Link>

                    {/* CLOSE BUTTON */}
                    <div className="prev-btn" onClick={goToPrevPage}>
                        ✕
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandPets;
