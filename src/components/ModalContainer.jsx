import React from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import {confirmAlert} from "react-confirm-alert";

const ModalContainer = (Children, props={}) => confirmAlert({
    closeOnEscape: props.closeOnEscape == null ? true : props.closeOnEscape,
    closeOnClickOutside: props.closeOnClickOutside == null ? true : props.closeOnClickOutside,
    customUI: ({onClose}) => <Provider store={store}>
        <Children
            onClose={onClose}
            {...props}
        />
    </Provider>
})

export default ModalContainer
