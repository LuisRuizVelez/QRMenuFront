import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";

// components
import Loader from "../../../ui/Loader";
import FBProjectList from "./FBProjectList";

// paths

import {STORE_PATHS_FB_PROJECT} from "../../../store/StorePaths";



const FBProject = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_PROJECT));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_FB_PROJECT) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_FB_PROJECT) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <FBProjectList />
    </>
}

export default FBProject