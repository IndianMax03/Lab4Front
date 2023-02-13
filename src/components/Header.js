import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faTelegram,
    faVk,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
    faPeopleGroup,
    faUser,
    faUserSecret,
    faArrowRightFromBracket,
    faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./mainPage/img/duck.png";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserInfo} from "../store/userSlice";
import {useNavigate} from "react-router-dom";
import {deleteData} from "../store/hitSlice";

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleBars = () => {
        document.querySelector("#nav-links").classList.toggle("is-active");
    };
    let userName = useSelector(state => state.user.username);
    let authorized = useSelector(state => state.user.authorized);
    let userId = useSelector(state => state.user.id);
    const author = {
        name: "Тучков Максим Русланович",
        group: "P32121",
        variant: 121227,
    };

    const userExited = () => {
        dispatch(deleteUserInfo());
        dispatch(deleteData());
        navigate('/', {replace: true});
    }

    return (
        <nav id="navbar" className="navbar has-shadow is-success mb-3 py-4 px-3">
            <div className="navbar-brand is-centered">
                <a href="https://se.ifmo.ru/courses/web">
                    <img src={logo} className="mt-3" width="32" height="32"/>
                </a>
                <a className="navbar-burger" id="burger" onClick={toggleBars}>
                    <span/>
                    <span/>
                    <span/>
                </a>
            </div>

            <div className="navbar-menu" id="nav-links">
                <div className="navbar-start bd-navbar-start bd-is-original">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <p className="navbar-link ml-2">Author</p>
                        <div className="navbar-dropdown is-boxed">
                            <a className="navbar-item" href="https://github.com/IndianMax03">
                <span className="icon has-text-dark mr-2">
                  <FontAwesomeIcon icon={faGithub}/>
                </span>
                                <span>Github</span>
                            </a>
                            <a className="navbar-item" href="https://vk.com/highest_indian_mind">
                <span className="icon has-text-dark mr-2">
                  <FontAwesomeIcon icon={faVk}/>
                </span>
                                <span>VK</span>
                            </a>
                            <a className="navbar-item" href="https://t.me/him_maxim">
                <span className="icon has-text-dark mr-2">
                  <FontAwesomeIcon icon={faTelegram}/>
                </span>
                                <span>Telegram</span>
                            </a>
                        </div>
                    </div>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">Info</a>
                        <div className="navbar-dropdown is-boxed">
                            <p className="navbar-item">
                <span className="icon has-text-dark mr-2">
                  <FontAwesomeIcon icon={faPeopleGroup}/>
                </span>
                                <span>{author.group}</span>
                            </p>
                            <p className="navbar-item">
                <span className="icon has-text-dark mr-2">
                  <FontAwesomeIcon icon={faReact}/>
                </span>
                                <span>{author.variant}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item is-hoverable" >
                        <p className="control">
                            <p className="has-text-white">
                                <span className="icon pr-2">
                                    <FontAwesomeIcon icon={authorized ? faUser : faUserSecret}/>
                                </span>
                                <span>{userName}</span>
                            </p>
                            {!authorized ? null :
                                <div className="navbar-dropdown is-boxed is-right">
                                    <span className="navbar-item">
                                        <span className="icon has-text-dark mr-2">
                                            <FontAwesomeIcon icon={faAddressCard}/>
                                        </span>
                                        <span>{userId}</span>
                                    </span>
                                    <hr className="navbar-divider" />
                                    <a className="navbar-item" onClick={userExited}>
                                        <span className="icon has-text-dark mr-2">
                                            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                                        </span>
                                        <span>{"Exit"}</span>
                                    </a>
                                </div>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
