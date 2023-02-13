import {useEffect, useState} from "react";
import Header from "../Header";
import Inputs from "./elements/Inputs";
import Canvas from "./elements/Canvas";
import Table from "./elements/Table";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteData, setData} from "../../store/hitSlice";
import {deleteUserInfo} from "../../store/userSlice";

function Main() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    let isFetching = true;

    useEffect(() => {
        let interval = null;
        if (isFetching) {
            interval = setInterval(() => {
                if (token === "" || !token) {
                    clearInterval(interval);
                    navigate('/', {replace: true});
                } else {
                    fetch("http://localhost:8081/api/hits/get", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "token": token,
                        }),
                    })
                        .then((response) => {
                            if (response.status === 500) {
                                clearInterval(interval);
                                dispatch(deleteUserInfo());
                                dispatch(deleteData());
                                navigate('/', {replace: true});
                                throw new Error("Server Error");
                            } else {
                                return response.json();
                            }
                        })
                        .then((data) => {
                            dispatch(setData({data}));
                        })
                        .catch((error) => {
                            console.log(error.message);
                        })
                }
            }, 1500);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [token]);

    const [r, setR] = useState("R");

    const rChanged = (rValue) => {
        setR(rValue);
    }

    return (
        <div className="Main">
            <Header/>
            {!token ? null : <div className="columns is-multiline is-vcentered">
                <div className="column is-6-tablet is-6-desktop is-12-mobile has-text-centered-mobile">
                    <Inputs rChanged={rChanged}/>
                </div>
                <div className="column is-6-tablet is-6-desktop is-12-mobile has-text-centered-mobile">
                    <Canvas rValue={r}/>
                </div>
                <div className="column is-8-desktop is-offset-2-desktop ">
                    <Table/>
                </div>
            </div>
            }
        </div>
    );
}

export default Main;
