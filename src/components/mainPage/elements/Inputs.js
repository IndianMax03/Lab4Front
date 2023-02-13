import '../styles/inputs.css';
import {faArrowsUpDown, faSquarePlus, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from "react";
import {deleteData, setData} from "../../../store/hitSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function Inputs(props) {

    const RADIO_VALUES = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    const X_JSX_ELEMENTS = [];
    const R_JSX_ELEMENTS = [];
    const Y_MAX_LENGTH = 12;
    const Y_MAX_VALUE = 5;
    const Y_MIN_VALUE = -5;
    const Y_PATTERN = /^-?[0-9]+(.[0-9]+)?$/g;

    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [r, setR] = useState("");
    const [buttonsHelper, setButtonsHelper] = useState("");

    let token = useSelector(state => state.user.token);
    const navigate = useNavigate();

    const yChanged = (event) => {
        let value = event.target.value.replaceAll(',', '.');
        let htmlElement = document.getElementById('y');
        let helperHtmlElement = document.getElementById('yDangerHelper');

        if (
            !isNaN(value) &&     //  y is number
            (value.match(Y_PATTERN) || []).length === 1 &&     //  y has only one pattern match
            value.length <= Y_MAX_LENGTH &&     //  y length is correct
            value >= Y_MIN_VALUE &&     //  y value is >= min_value
            value <= Y_MAX_VALUE                                  //  y value is <= max_value
        ) {

            htmlElement.classList.remove('is-danger');
            htmlElement.classList.add('is-success');
            helperHtmlElement.classList.add('is-hidden');
            setY(value);
        } else {
            htmlElement.classList.remove('is-success');
            htmlElement.classList.add('is-danger');
            helperHtmlElement.classList.remove('is-hidden');
            setY("");
        }
    }

    const Y_JSX_ELEMENT = (
        <input
            id='y'
            className='input is-small is-rounded'
            onChange={yChanged}
            type="text"
            maxLength={Y_MAX_LENGTH}
            placeholder="(-5 .. 5)"
        />
    );
    RADIO_VALUES.forEach((data) => {
        X_JSX_ELEMENTS.push(
            <div className="form_radio_group-item">
                <input
                    id={'x-' + data}
                    type="radio" name="x"
                    value={data}
                    onChange={(event) => {setX(event.target.value)}}
                />
                <label for={'x-' + data}>{data}</label>
            </div>
        );
        R_JSX_ELEMENTS.push(
            <div className="form_radio_group-item">
                <input
                    id={'r-' + data}
                    type="radio"
                    name="r"
                    onChange={(event) => {props.rChanged(data); setR(event.target.value)}}
                    value={data}
                />
                <label for={'r-' + data}>{data}</label>
            </div>
        );
    });

    const dispatch = useDispatch();
    function submitButtonClicked(event) {
        if (x && y && r && token) {
            fetch("http://localhost:8081/api/hits/append", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "x": x,
                    "y": y,
                    "r": r,
                    "token": token,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    dispatch(setData({data}));
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            event.preventDefault();
            if (!token) {
                navigate('/', {replace: true});
            }
            if (!(x && y && r)) {
                setButtonsHelper("You need to choose all coordinates");
            }
        }
    }

    const clearButtonClicked = (event) => {
        if (token) {
            fetch("http://localhost:8081/api/hits/delete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "token": token,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.message === 'success') {
                        dispatch(deleteData());
                    } else {
                        throw new Error(data.message())
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            event.preventDefault();
            navigate('/', {replace: true});
        }
    }

    return (
        <div className={"has-text-centered"}>
            <div className='field xField py-3 has-text-centered'>
                <label className='label'>Choose your X:</label>
                <div className="control xDiv form_radio_group">
                    {X_JSX_ELEMENTS}
                </div>
            </div>

            <div className='field yField py-3 has-text-centered'>
                <label className='label'>Text your Y:</label>
                <p className='control has-icons-left yDiv has-text-centered'>
                    {Y_JSX_ELEMENT}
                    <span className='icon is-small is-left'>
                    <FontAwesomeIcon icon={faArrowsUpDown}/>
                </span>
                </p>
                <div id='helpingDiv' className={"has-text-centered"}>
                    <p id='yDangerHelper' className='help is-danger is-hidden has-text-centered'>
                        {'(y is double) | (-5 <= y <= 5) | (y length <= 12)'}
                    </p>
                </div>
            </div>


            <div className='field rField py-3 has-text-centered'>
                <label className='label'>Choose your R:</label>
                <div className="control rDiv form_radio_group">
                    {R_JSX_ELEMENTS}
                </div>
            </div>

            <div className='has-text-centered'>
                <button id='submut_button' onClick={submitButtonClicked} className='button is-success is-hoverable is-outlined is-rounded'>
                    <span>Submit</span>
                    <span className='icon is-small is-right'>
                        <FontAwesomeIcon icon={faSquarePlus}/>
                    </span>
                </button>
                <button id='clear_button' onClick={clearButtonClicked} className='button is-danger is-hoverable is-outlined is-rounded ml-5'>
                    <span>Clear</span>
                    <span className='icon is-small is-right'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </span>
                </button>
                <div className={"buttonsHelper control my-2"}>
                    <p id={"buttonsHelperP"} className="help is-danger has-text-centered">{!(x&&y&&r)? buttonsHelper : ""}</p>
                </div>
            </div>

        </div>
    );
}

export default Inputs;
