import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DrinkCategoryList from "./DrinkCategoryList"; // list component


// paths
import {STORE_PATHS_DRINK_CATEGORY} from "../../../store/StorePaths";



const DrinkCategory = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_DRINK_CATEGORY));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_DRINK_CATEGORY) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_DRINK_CATEGORY) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <DrinkCategoryList />
    </>
}

export default DrinkCategory