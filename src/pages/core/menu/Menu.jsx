import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import MenuList from "./MenuList"; // list component


// paths
import {STORE_PATHS_CORE_MENU} from "../../../store/StorePaths";



const Menu = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_MENU));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_CORE_MENU) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_CORE_MENU) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <MenuList />
    </>
}

export default Menu