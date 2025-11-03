import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import CurrencyList from "./CurrencyList"; // list component


// paths
import {STORE_PATHS_CURRENCY} from "../../../store/StorePaths";



const Currency = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CURRENCY));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_CURRENCY) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_CURRENCY) );
        };
    }, [dispatch]);



    return <>
        { loading && Loader() }
        <CurrencyList />
    </>
}

export default Currency