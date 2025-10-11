import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import FBChildPathList from "./FBChildPathList";


// paths
import {STORE_PATHS_FB_CHILD_PATH} from "../../../store/StorePaths";



const FBChildPath = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_FB_CHILD_PATH));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_FB_CHILD_PATH) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_FB_CHILD_PATH) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <FBChildPathList />
    </>
}

export default FBChildPath