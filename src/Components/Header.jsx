import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'
import '../assets/Styles/Header.css'

const Header = () => {
    return (
        <nav>
            <div className="logo">
                Pet Store
            </div>
            <div className="features">
                <div className="fav">
                <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className="chats">
                <FontAwesomeIcon icon={faMessage} />
                </div>
                <div className="auth">
                    Log In
                </div>
            </div>
        </nav>
    )
}

export default Header;