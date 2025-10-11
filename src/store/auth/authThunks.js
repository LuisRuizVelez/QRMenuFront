import {checkingCredentials, login, logout} from "./authSlice";
import {authenticationService} from "../../services/AuthenticationService";
import store from "../store";


export const checkingAuthentication = (username, password, callBack = ()=>{}) => async (dispatch) => {
    dispatch( checkingCredentials() );

    try {
        const authenticationResult = await authenticationService.login(username, password);
        dispatch(login({...authenticationResult}));
    } catch (error) {
        dispatch(logout({error_message: error.message || 'Authentication failed'}));
        console.error('Error during authentication', error);
    }
}


export const clearAuthentication = () => async (dispatch) => {
    try {
        dispatch( logout() );
    } catch (error) {
        dispatch(logout({error_message: error.message || 'Authentication failed'}));
        console.error('Error during authentication', error);
    }
}

export const getCurrentUser = () => store.getState()?.auth;

export const logoutUser = () => store.dispatch(clearAuthentication());