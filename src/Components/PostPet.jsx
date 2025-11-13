import { useState, useEffect } from "react";
import "../assets/Styles/PostPet.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:8000/api";

const PostPet = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("");

    // Form fields
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("Dog");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const decodeJWT = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch {
            return null;
        }
    };

    // Check user role (seller only)
    useEffect(() => {
        const token = Cookies.get("jwt");
        if (!token) {
            navigate("/auth");
            return;
        }

        const user = decodeJWT(token);
        if (user?.role !== "seller") {
            alert("Only sellers can post pets.");
            navigate("/");
        } else {
            setUserRole(user.role);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = Cookies.get("jwt");

        const payload = {
            name,
            species,
            breed,
            age,
            gender,
            price,
            description: desc,
            images: [imageUrl],
            location: {
                city,
                state,
            },
        };

        const res = await fetch(`${BACKEND_URL}/pets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Pet posted successfully!");
            navigate("/");
        } else {
            alert(data.error || "Failed to post pet.");
        }
    };

    return (
        <div className="post-wrapper">
            <h2>Post Your Pet</h2>

            <form className="post-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Pet Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Parrot">Parrot</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Fish">Fish</option>
                </select>

                <input
                    type="text"
                    placeholder="Breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Age (years)"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />

                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <input
                    type="number"
                    placeholder="Price (₹)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                ></textarea>

                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Image URL (cloudinary / external)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />

                <button type="submit" className="submit-btn">
                    Post Pet
                </button>
            </form>
        </div>
    );
};

export default PostPet;
