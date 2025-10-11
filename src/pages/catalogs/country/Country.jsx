import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import CountryList from "./CountryList";


// paths
import {STORE_PATHS_COUNTRY} from "../../../store/StorePaths";



const Country = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_COUNTRY));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_COUNTRY) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_COUNTRY) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <CountryList />
    </>
}

export default Country