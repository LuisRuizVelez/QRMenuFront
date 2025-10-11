import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DishAttributesList from "./DishAttributesList"; // list component


// paths
import {STORE_PATHS_DISH_ATTRIBUTES} from "../../../store/StorePaths";



const DishAttributes = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_ATTRIBUTES));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_DISH_ATTRIBUTES) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_DISH_ATTRIBUTES) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <DishAttributesList />
    </>
}

export default DishAttributes