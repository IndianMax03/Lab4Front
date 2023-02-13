import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/mainPage/Main";
import Authentication from "./components/userDetectingPages/authenticationPage/Authentication";
import Error404 from "./components/errorPage/Error404";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Authentication />} />
                <Route path={"/main"} element={<Main />}/>
                <Route path={"*"} element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
