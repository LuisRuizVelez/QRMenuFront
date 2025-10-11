import {Route, Routes, useNavigate} from "react-router";
import { useLocation } from "react-router";
import {useEffect} from "react";
import {useSelector} from "react-redux";


// components
import Sidebar from "../ui/Sidebar";
import useRoute from "../hooks/useRoute";



const MainRoutes = () => {
    const {selectedSection:code} = useSelector((state) => state.ui);
    const location = useLocation();
    const [route, routes] = useRoute(code); // Using the custom hook to get routes based on the selected section


    const navigate = useNavigate();

    useEffect(() => {
        if((location.pathname !== route?.path) && location.pathname !== '/main')
            return

        if (route)
            navigate(route.path)
    }, [route, navigate]);

    return <div className="row">
        <div className="col-2 p-0">
            <Sidebar/>
        </div>


        <div className="col-10">
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.component}/>
                    ))
                }
            </Routes>
        </div>
    </div>
}

export default MainRoutes;