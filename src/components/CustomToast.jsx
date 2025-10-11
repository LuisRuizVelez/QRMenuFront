import React from "react";
import { toast } from "react-toastify";

const defaultOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};


export const ALERT_TYPES = {
    SUCCESS: "success",
    INFO: "info",
    ERROR: "error",
    WARNING: "warning"
}

const toastTypes = {
    success: (title, message) =>
        toast.success(
            <div>
                <h3 className="h2-title">{title}</h3>
                <div className="toast-msg">
                    <i className="toast-icon fas fa-check-circle fa-2x" />
                    {message}
                </div>
            </div>,
            defaultOptions
        ),
    info: (title, message) =>
        toast.info(
            <div>
                <h3 className="h2-title">{title}</h3>
                <div className="toast-msg">
                    <i className="justify-content-center toast-icon fas fa-info-circle fa-2x" />
                    {message}
                </div>
            </div>,
            defaultOptions
        ),
    warning: (title, message) =>
        toast.warning(
            <div className="justify-content-center">
                <h3 className="h2-title">{title}</h3>
                <div className="toast-msg">
                    <i className="toast-icon fas fa-exclamation-triangle fa-2x" />
                    {message}
                </div>
            </div>,
            defaultOptions
        ),
    error: (title, message) =>
        toast.error(
            <div>
                <h3 className="h2-title">{title}</h3>
                <div className="toast-msg">
                    <i className="toast-icon fas fa-times fa-2x" />
                    {message}
                </div>
            </div>,
            defaultOptions
        ),
};

export const showToastCustom = (typeAction = "success", title = "", message = "") => {
    const toastFunction = toastTypes[typeAction.toLowerCase()];

    if (toastFunction) {
        return toastFunction(title, message);
    } else {
        console.error(`Invalid toast type: ${typeAction}`);
    }
};