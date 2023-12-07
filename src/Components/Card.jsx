
const Card = ({animals}) => {
    return (
        <div className="card">
            <div className="pet-img">
                <img src={animals.image} alt="" />
            </div>
            <div className="pet-info">
                <div>{animals.species}</div>
                <div>{animals.breed}</div>
                <div>₹{animals.price}</div>
            </div>
        </div>
    )
}

export default Card;