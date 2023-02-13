import {useRef, useEffect} from 'react'
import * as graph from '../utils/graphic.js'
import {useWindowSize} from '../hooks/windowSizeListener.js';
import {useDispatch, useSelector} from "react-redux";
import {setData} from "../../../store/hitSlice";

function Canvas(props) {

    const size = useWindowSize();
    const canvasRef = useRef(null);
    let hits = useSelector(state => state.hit.data);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    let canvas;

    useEffect(() => {
        canvas = canvasRef.current;
        let width = 300;
        let height = 300;
        if (size.width <= 768) {
            width = 250;
            height = 250;
        } else if (size.width >= 769 && size.width < 1000) {
            width = 300;
            height = 300;
        } else if (size.width >= 1000 && size.width < 1300) {
            width = 450;
            height = 450;
        } else if (size.width >= 1300) {
            width = 600;
            height = 600;
        }
        canvas.width = width;
        canvas.height = height;
        graph.drawGraphic(canvas.width, canvas.height, props.rValue, canvas, hits)
    }, [size, props.rValue, hits])

    const clickedOnCanvas = (event) => {
        const rect = canvas.getBoundingClientRect()
        const xPos = event.clientX - rect.left
        const yPos = event.clientY - rect.top
        const {x, y, r} = graph.formatCoordinates(xPos, yPos, props.rValue, canvas);
        if (x !== null && y !== null && r !== null && token) {
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
                    console.log("Gotten invalid data")
                })
        } else {
            event.preventDefault();
        }
    }

    return <canvas ref={canvasRef} {...props} onMouseDown={clickedOnCanvas}/>
}

export default Canvas;
