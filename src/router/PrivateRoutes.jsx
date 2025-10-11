import {Navigate, Route, Routes} from "react-router";
import Main from "../main/Main";
import {useSelector} from "react-redux";
import MainRoutes from "./MainRoutes";
import React from "react";
import Navbar from "../ui/Navbar";



const PrivateRoutes = () => {
    const {selectedSection} = useSelector((state) => state.ui);

    return <>
        <Navbar/>
        <Routes>
            {
                selectedSection
                    ? <Route path="/*" element={<MainRoutes/>}/>
                    : <Route path="/main" element={<Main />}/>
            }

            <Route path="/*" element={ <Navigate to={"/main"} /> } />
        </Routes>

    </>
}

export default PrivateRoutes;