import {Route, Routes} from "react-router";
import HomePage from "../pages/home/HomePage.tsx";


function RootRouter() {
    return <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/" />
    </Routes>
}

export default RootRouter;