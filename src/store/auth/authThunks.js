import { ALERT_TYPES, showToastCustom } from "../../components/CustomToast";


import {checkingCredentials, login, logout, setGroupingRole, setSelectedGroupingRole, setGroupingRoleRequired} from "./authSlice";
import {authenticationService} from "../../services/AuthenticationService";
import store from "../store";


export const checkingAuthentication = (username, password, callBack = ()=>{}) => async (dispatch) => {
    dispatch( checkingCredentials() );

    try {
        const authenticationResult = await authenticationService.login(username, password);
        const groupingRoleResult = await authenticationService.getGroupingRole(username);

        dispatch(login({...authenticationResult}));
        dispatch(setGroupingRole({...groupingRoleResult}));
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

export const setSelectedGroupingRoleThunk = ( selectedRole ) => async (dispatch) => {
    try {
        dispatch( setSelectedGroupingRole( selectedRole ) );
    } catch (error) {
        console.error('Error setting selected grouping role', error);
    }
}

export const setGroupingRoleRequiredThunk = ( value ) => async (dispatch) => {
    try {
        dispatch( setGroupingRoleRequired( value ) );
    } catch (error) {
        console.error('Error setting selected grouping role', error);
    }
}

// Valida grouping_role_required y muestra toast si falta el rol. Devuelve true si OK, false si no.
export const validateGroupingRole = () => {
    const authState = store.getState().auth;
    const { grouping_role_required, selected_grouping_role } = authState;

    if (!grouping_role_required)
        return {valid: true};

    if (!selected_grouping_role) {
        showToastCustom(ALERT_TYPES.ERROR, "Debe seleccionar un rol de agrupación antes de continuar.");
        
        return {valid: false};
    }

    return {valid: true, groupingRole: selected_grouping_role};
}