import Header from "../../Header";
import {useNavigate} from "react-router-dom";
import EnterTerminal from "../util/EnterTerminal";
import {useEffect} from "react";
import {useSelector} from "react-redux";

function Authentication() {

    const navigate = useNavigate();
    let token = useSelector(state => state.user.token);
    useEffect(() => {
        if (token) {
            navigate('/main', {replace: true});
        }
    }, [token]);

    return (
        <div className="Authentication">
            <Header />
            <br />
            <EnterTerminal />
        </div>
    );
}

export default Authentication;