import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";

// components
import Loader from "../../../ui/Loader";
import LangList from "./LangList";


// paths
import {STORE_PATHS_LANG} from "../../../store/StorePaths";



const Lang = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_LANG));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_LANG) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_LANG) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <LangList />
    </>
}

export default Lang