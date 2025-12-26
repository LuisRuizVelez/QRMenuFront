import axios from 'axios';

import {getEndPoint} from "../connection/apiConfig";


const createHeaders = () => {
    const user = getCurrentUser();
    return {
        'Content-Type': 'application/json',
        ...(user?.access_token && { 'Authorization': `Bearer ${user.access_token}` }),
    };
};

const login = async (username, password) => {
    const url = getEndPoint('api/login');
    try {
        const response = await axios.post(url, { username, password }, { headers: createHeaders() });
        const user = response?.data;
        localStorage.setItem('currentUser', JSON.stringify(user)); // Store user details
        return user;
    } catch (error) {
        console.error('Login failed', error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    } catch (error) {
        console.error('Failed to parse current user from localStorage', error);
        return null;
    }
};

const logout = async () => {
    const url = getEndPoint('api/logout');
    try {
        await axios.post(url, {}, { headers: createHeaders() });
        localStorage.clear(); // Clear user data
    } catch (error) {
        console.error('Logout failed', error);
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
};

const validate = async () => {
    const url = getEndPoint('api/validate');
    try {
        const response = await axios.get(url, { headers: createHeaders() });
        return response?.data;
    } catch (error) {
        console.error('Validation failed', error);
        throw new Error(error.response?.data?.message || 'Validation failed');
    }
};


const getGroupingRole = async (username) => {
    const url = getEndPoint(`api/User/getGroupingRole/${username}` );
    
    try {
        const response = await axios.get(url, { headers: createHeaders() });
        return response?.data;
    } catch (error) {
        console.error('Login failed', error);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};


export const authenticationService = {
    login,
    logout,
    validate,
    getCurrentUser,
    getGroupingRole
}














