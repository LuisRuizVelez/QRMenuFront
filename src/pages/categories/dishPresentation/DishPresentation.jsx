import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DishPresentationList from "./DishPresentationList"; // list component


// paths
import {STORE_PATHS_DISH_PRESENTATION} from "../../../store/StorePaths";



const DishPresentation = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DISH_PRESENTATION));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_DISH_PRESENTATION) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_DISH_PRESENTATION) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <DishPresentationList />
    </>
}

export default DishPresentation