import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DrinkPresentationList from "./DrinkPresentationList"; // list component


// paths
import {STORE_PATHS_DRINK_PRESENTATION} from "../../../store/StorePaths";


const DrinkPresentation = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DRINK_PRESENTATION));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_DRINK_PRESENTATION) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_DRINK_PRESENTATION) );
        };
    }, [dispatch]);




    return <>
        { loading && Loader() }
        <DrinkPresentationList />
    </>
}

export default DrinkPresentation