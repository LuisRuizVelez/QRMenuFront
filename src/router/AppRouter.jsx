import React from 'react'
import {Navigate, Route, Routes} from "react-router";
import { useSelector } from "react-redux";


import Login from "../pages/auth/Login";
import PrivateRoutes from "./PrivateRoutes";


const AppRouter = () => {
    const {status} = useSelector((state) => state.auth);

    return <>
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={ <PrivateRoutes /> } />
                    : <Route path="/login" element={ <Login /> } />
            }

            <Route path="/*" element={ <Navigate to={"/login"} /> } />


        </Routes>
    </>
}

export default AppRouter;