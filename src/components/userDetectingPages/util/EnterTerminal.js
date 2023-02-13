import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faUser, faKey} from "@fortawesome/free-solid-svg-icons";
import './styles/enterTerminal.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setUserInfo} from "../../../store/userSlice";
import {useNavigate} from "react-router-dom";

function EnterTerminal(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registration, setRegistration] = useState(false);
    const [buttonState, setButtonState] = useState(true);
    const [username, setUsername] = useState("");
    const [usernameHelper, setUsernameHelper] = useState("");
    const [password, setPassword] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");

    const usernameChanged = (event) => {
        const newUsername = event.target.value;
        let usernameElement = document.getElementById("usernameInput");
        setUsername(newUsername);

        if (newUsername.includes(" ") || newUsername === "") {
            usernameElement.classList.add("is-danger");
            setUsernameHelper("Username cannot contains whitespaces or be empty line");
        } else {
            usernameElement.classList.remove("is-danger");
            setUsernameHelper("");
        }

        setButtonState(!(!(newUsername.includes(" ") || newUsername === "") && !(password.includes(" ") || password === "")));
    }

    const passwordChanged = (event) => {
        const newPassword = event.target.value;
        const passwordElement = document.getElementById("passwordInput");
        setPassword(newPassword);

        if (newPassword.includes(" ") || newPassword === "") {
            passwordElement.classList.add("is-danger");
            setPasswordHelper("Password cannot contains whitespaces or be empty line");
        } else {
            passwordElement.classList.remove("is-danger");
            setPasswordHelper("");
        }

        setButtonState(!(!(username.includes(" ") || username === "") && !(newPassword.includes(" ") || newPassword === "")));
    }

    async function buttonClicked(event) {
        let type = registration ? "register" : "login";
        let url = "http://localhost:8081/api/auth/" + type;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (!data.token) {
                    throw new Error(data.message);
                }
                const safeData = {
                    "username": data.username,
                    "id": data.id,
                    "authorized": true,
                    "token": data.token,
                }
                dispatch(setUserInfo(safeData));
                navigate('/main', {replace: true});
            })
            .catch((error) => {
                if (error.message === "Failed to fetch") {
                    setUsernameHelper("Cannot get answer from server. Try again later.");
                } else {
                    setUsernameHelper((error.message).charAt(0).toUpperCase() + error.message.slice(1));
                }
            });

    }

    return (
        <div>
            <section className={"section mt-6"}>
                <div className={"container"}>
                    <div className={"columns is-vcentered is-multiline"}>
                        <div className={"column is-offset-one-third is-one-third has-text-centered my-2"}>
                            <span
                                className={"has-text-weight-bold is-size-4"}>{registration ? "Register" : "Login"} to continue</span>
                        </div>
                        <div className={"column is-offset-one-third is-one-third has-text-centered"}>
                        <span className={"has-text-weight-bold"}>
                            <span className={"label"}>Enter username:</span>
                            <div className={"control has-icons-left"}>
                                <input id={"usernameInput"} value={username} className={"input is-small is-rounded"}
                                       type={"text"}
                                       onChange={usernameChanged}/>
                                <span className='icon is-small is-left'>
                                    <FontAwesomeIcon icon={faUser}/>
                                </span>
                            </div>
                            <div className={"usernameHelperDiv"}>
                                <p id={"usernameHelperP"} className="help is-danger has-text-left">{usernameHelper}</p>
                            </div>
                        </span>
                        </div>
                        <div className={"column is-offset-one-third is-one-third has-text-centered"}>
                        <span className={"has-text-weight-bold"}>
                            <span className={"label"}>Enter password:</span>
                            <div className={"control has-icons-left"}>
                                <input id={"passwordInput"} className={"input is-small is-rounded"} type={"password"}
                                       value={password}
                                       onChange={passwordChanged}/>
                                <span className='icon is-small is-left'>
                                    <FontAwesomeIcon icon={faKey}/>
                                </span>
                            </div>
                            <div className={"passwordHelperDiv"}>
                                <p id={"passwordHelperP"} className="help is-danger has-text-left">{passwordHelper}</p>
                            </div>
                        </span>
                        </div>
                        <div className={"column is-offset-one-third is-one-third"}>
                            <span>
                                <label className={"checkbox"}>
                                <input type={"checkbox"} onChange={() => setRegistration(!registration)}/>
                                    {"  I want to register"}
                            </label>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"section has-text-centered"}>
                <button
                    id={"submitUserData"}
                    className={"button is-black is-hoverable is-outlined is-size-6 is-rounded"}
                    disabled={buttonState}
                    onClick={buttonClicked}
                >
                    <span>Submit</span>
                    <span className='icon is-small is-right'>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                </button>
            </section>
        </div>


    );
}

export default EnterTerminal;