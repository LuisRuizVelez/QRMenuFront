import axios from "axios";
import { getBaseEndPoint } from "./apiConfig";
import { ALERT_TYPES, showToastCustom } from "../components/CustomToast";
import {
    DEFAULT_DELETE_ERROR_MESSAGE,
    DEFAULT_DELETE_MESSAGE,
    DEFAULT_ERROR_MESSAGE, DEFAULT_NOT_FOUND_MESSAGE,
    DEFAULT_SAVE_MESSAGE,
    DEFAULT_UPDATE_ERROR_MESSAGE,
} from "../labels/alertMessages";
import {getCurrentUser, logoutUser} from "../store/auth/authThunks";

// HTTP status codes
const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    MULTIPLE_CHOICES: 300,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 402,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_ACCEPTABLE: 406,
    UNKNOWN_ERROR: 520,
};

const CURRENT_ENVIRONMENT = 'production'; // Change this to 'develop' or 'test' or 'production' as needed


// Create a reusable Axios instance
const api = axios.create({
    baseURL: getBaseEndPoint(CURRENT_ENVIRONMENT),
    responseType: "json",
});



export const doRequest = async (url, method, { data = null, head = null, showAlert = true, message = null } = {}) => {
    const currentUser = getCurrentUser();


    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentUser?.access_token}`,
        ...head,
    };

    const options = {
        method,
        headers,
        ...(data && { data: JSON.stringify(data) }),
    };


    try {
        const response = await api(url, options);
        const responseData = response?.data;

        if (!showAlert) return responseData;

        handleResponseStatus(response.status, message);

        return responseData;
    } catch (error) {

        console.error("API request error:", error);

        if(error?.code === 'ERR_NETWORK') {
            showToastCustom(ALERT_TYPES.ERROR, DEFAULT_ERROR_MESSAGE);
            logoutUser()
            return;
        }


        handleResponseStatus(error.status, message);
    }
};

const handleResponseStatus = (status, customMessage) => {


    switch (status) {
        case HTTP_STATUS.SUCCESS:
        case HTTP_STATUS.CREATED:
            showToastCustom(ALERT_TYPES.SUCCESS, customMessage || DEFAULT_SAVE_MESSAGE);
            break;
        case HTTP_STATUS.NO_CONTENT:
            showToastCustom(ALERT_TYPES.WARNING, customMessage || DEFAULT_DELETE_MESSAGE);
            break;
        case HTTP_STATUS.MULTIPLE_CHOICES:
            showToastCustom(ALERT_TYPES.ERROR, customMessage || DEFAULT_DELETE_ERROR_MESSAGE);
            break;
        case HTTP_STATUS.UNAUTHORIZED:
            logoutUser()
            break
        case HTTP_STATUS.BAD_REQUEST:
        case HTTP_STATUS.FORBIDDEN:
        case HTTP_STATUS.NOT_FOUND:
            showToastCustom(ALERT_TYPES.ERROR, customMessage || DEFAULT_NOT_FOUND_MESSAGE);
            break;
        case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            showToastCustom(ALERT_TYPES.ERROR, customMessage || DEFAULT_UPDATE_ERROR_MESSAGE);
            break;
        case HTTP_STATUS.NOT_ACCEPTABLE:
            showToastCustom(ALERT_TYPES.WARNING, customMessage || DEFAULT_UPDATE_ERROR_MESSAGE);
            break;
        case HTTP_STATUS.UNKNOWN_ERROR:
            showToastCustom(ALERT_TYPES.ERROR, customMessage || DEFAULT_ERROR_MESSAGE);
            break;
        default:
            console.warn(`Unhandled status code: ${status}`);
            break;
    }
};