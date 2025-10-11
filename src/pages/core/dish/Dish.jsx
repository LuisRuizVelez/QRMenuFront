import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DishList from "./DishList"; // list component


// paths
import {STORE_PATHS_CORE_DISH} from "../../../store/StorePaths";



const Dish = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_CORE_DISH) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_CORE_DISH) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <DishList />
    </>
}

export default Dish