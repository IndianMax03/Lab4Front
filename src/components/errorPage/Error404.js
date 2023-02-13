import {useNavigate} from "react-router-dom";
import './styles/error404.css';

function Error404() {

    const navigateBack = useNavigate();

    function toHistoryBack() {
        navigateBack(-1, {replace: true});
    }

    function toAuthentication() {
        navigateBack('/', {replace: true});
    }

    return (
        <div className={"Error404 is-family-monospace"}>
            <nav id={"head_error404"} className={"box has-text-centered"}>
                <h1>Ошибка 404: вы перешли по несуществующему адресу</h1>
            </nav>
            <div className={"section has-text-centered"}>
                <h1 className={"my-5 has-text-weight-bold"}>Попробуйте:</h1>
                <button className={"button m-3 is-family-monospace is-black is-hoverable is-outlined is-rounded"} onClick={toHistoryBack}>{"Вернуться назад"}</button>
                <button className={"button m-3 is-family-monospace is-black is-hoverable is-outlined is-rounded"} onClick={toAuthentication}>{"Вернуться на страницу аутентификации"}</button>
            </div>
        </div>
    );

}

export default Error404;