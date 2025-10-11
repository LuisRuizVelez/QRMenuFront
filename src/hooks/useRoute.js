import {useEffect, useState} from "react";

import MAP_ROUTERS from "../router/MapRouters";

const useRoute = (code) => {
    const [routes, setRoutes] = useState([])
    const [rout, setRout] = useState('')

    useEffect(() => {
        getRoutes()
    }, [code]);

    const getRoutes = () => {
        const routes = MAP_ROUTERS
            .filter(route => route.code === code)

        setRout(routes.length > 0 ? routes[0] : null);
        setRoutes(routes);
    }

    return [rout, routes];
}

export default useRoute;