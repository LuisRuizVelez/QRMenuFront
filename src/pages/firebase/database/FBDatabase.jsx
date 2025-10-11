import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import FBDatabaseList from "./FBDatabaseList";


// paths
import {STORE_PATHS_FB_DATABASE} from "../../../store/StorePaths";



const FBDatabase = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_DATABASE));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_FB_DATABASE) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_FB_DATABASE) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <FBDatabaseList />
    </>
}

export default FBDatabase