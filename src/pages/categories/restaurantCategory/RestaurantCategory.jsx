import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import RestaurantCategoryList from "./RestaurantCategoryList";


// paths
import {STORE_PATHS_RESTAURANT_CATEGORY} from "../../../store/StorePaths";



const RestaurantCategory = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_RESTAURANT_CATEGORY));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_RESTAURANT_CATEGORY) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_RESTAURANT_CATEGORY) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <RestaurantCategoryList />
    </>
}

export default RestaurantCategory