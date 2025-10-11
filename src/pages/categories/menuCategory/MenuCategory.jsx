import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {navigationAddState, navigationRemoveState, getStateByPath} from "../../../store/navigation/navigationThunks";


// components
import Loader from "../../../ui/Loader";
import MenuCategoryList from "./MenuCategoryList";


// paths
import {STORE_PATHS_MENU_CATEGORY} from "../../../store/StorePaths";



const MenuCategory = () => {
    const dispatch = useDispatch();
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_MENU_CATEGORY));

    const {loading} = componentState?.data || false;


    // Add navigation state when component mounts
    useEffect(() => {
        dispatch( navigationAddState(STORE_PATHS_MENU_CATEGORY) );

        return () => {
            dispatch( navigationRemoveState(STORE_PATHS_MENU_CATEGORY) );
        };
    }, [dispatch]);





    return <>
        { loading && Loader() }
        <MenuCategoryList />
    </>
}

export default MenuCategory