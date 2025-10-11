import {createSlice} from "@reduxjs/toolkit";

const newState = {
    loading:false,
    selectedSection:null,
    editableLangs: [],
}


export const uiSlice = createSlice({
    name: 'ui',
    initialState: newState,
    reducers: {
        setSelectedSection: (state, action) => {
            state.selectedSection = action.payload.section;
        },
        removeSelectedSection: (state) => {
            state.selectedSection = null;
        },
        setEditableLangs: (state, action) => {
            state.editableLangs = action.payload.langs;
        },
        setLoading: (state, action) => {
            state.loading = action.payload.loading;
        }
    }
})

export const {
    setSelectedSection,
    removeSelectedSection,
    setEditableLangs,
    setLoading
} = uiSlice.actions;