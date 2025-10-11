import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import SectionList from "./SectionList";


// paths
import {STORE_PATHS_SECTION} from "../../../store/StorePaths";



const Section = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_SECTION));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_SECTION) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_SECTION) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <SectionList />
    </>
}

export default Section