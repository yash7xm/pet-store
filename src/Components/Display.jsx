import "../assets/Styles/Display.css"

const Display = () => {
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
                <button>Dogs</button>
                <button>Cats</button>
                <button>Lions</button>
            </div>
        </div>
    )
}

export default Display;