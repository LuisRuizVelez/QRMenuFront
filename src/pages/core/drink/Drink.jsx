import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import DrinkList from "./DrinkList"; // list component


// paths
import {STORE_PATHS_CORE_DRINK} from "../../../store/StorePaths";



const Drink = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DRINK));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_CORE_DRINK) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_CORE_DRINK) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <DrinkList />
    </>
}

export default Drink