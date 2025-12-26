import {
    setSelectedSection,
    removeSelectedSection,
    setEditableLangs,
    setLoading,
    clearUiState
} from './uiSlice';


export const uiSetSelectedSection = section => async (dispatch) => {
    dispatch(setSelectedSection( { section } ));
}

export const uiSetSelectedSectionThunk = () => async (dispatch) => {
    dispatch( removeSelectedSection() );
}

export const uiSetEditableLangs = langs => async (dispatch) => {
    dispatch(setEditableLangs( { langs } ));
}

export const uiSetLoading = loading => async (dispatch) => {
    dispatch(setLoading( { loading } ));
}

export const uiClearState = () => async (dispatch) => {
    dispatch(clearUiState());
}