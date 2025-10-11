import {createSlice} from "@reduxjs/toolkit";



export const authSlice = createSlice({
    name:'auth',
    initialState:{
        status: "not-authenticated", // "checking", "authenticated", "not-authenticated"
        username: null,
        roles: null,
        token_type: null,
        access_token:null,
        error_message: null
    },
    reducers:{
        login: (state, action) => {
            state.status = "authenticated";
            state.username = action.payload.username;
            state.roles = action.payload.roles;
            state.token_type = action.payload.token_type;
            state.access_token = action.payload.access_token;
            state.error_message = null;
        },
        logout: (state) => {
            state.status = "not-authenticated";
            state.username = null;
            state.roles = null;
            state.token_type = null;
            state.access_token = null;
            state.error_message = null;
        },
        checkingCredentials: (state) => {
            state.status = "checking";
        }
    }
})

export const {login, logout, checkingCredentials}= authSlice.actions;