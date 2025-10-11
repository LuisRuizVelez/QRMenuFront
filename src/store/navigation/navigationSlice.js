import {createSlice} from "@reduxjs/toolkit";

const newState = {
    loading     : false,
    filter      : null,
    selectedItem: null,
    langsEdited : [],
    langValidationErrors: null,
    items       : [],
    page        : 1,
    sizePerPage : 10,
    totalSize   : 0,
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: [],
    reducers: {
        addState: (state, action) => {
            // Check if state with the same path already exists
            if (!state.some(s => s.path === action.payload.path))
                state.push({
                    path: action.payload.path,
                    data: newState
                });
        },
        removeState: (state, action) => {
            return state.filter(s => s.path !== action.payload.path);
        },
        setLoading: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, loading: action.payload.loading } }
                : s);
        },
        setTableParams: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, page: action?.payload?.page, sizePerPage:action?.payload?.sizePerPage, totalSize:action?.payload?.totalSize  } }
                : s);
        },
        setItems: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, items: action.payload.items } }
                : s);
        },
        setSelectedItem: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, selectedItem: action.payload.selectedItem } }
                : s);
        },
        addItem: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, items: [ ...s.data.items, action.payload.item ] } }
                : s);
        },
        removeItem: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, items: s.data.items.filter(i => i.id !== action.payload.id) } }
                : s);
        },
        updateItem: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, items: s.data.items.map(i => i.id === action.payload.item.id ? action.payload.item : i) } }
                : s);
        },
        setFilter: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, filter: action.payload.filter } }
                : s);
        },
        setLangsEdited: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, langsEdited: action.payload.langs } }
                : s);
        },
        updateEditableLangs: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, langsEdited: action.payload.langsEdited } }
                : s);
        },
        setLangValidationsErrors: (state, action) => {
            return state.map(s => s.path === action.payload.path
                ? { ...s, data: { ...s.data, langValidationErrors: action.payload.errors } }
                : s);
        }
    }
})

export const {
    addState,
    removeState,
    setLoading,
    setTableParams,
    setSelectedItem,
    setItems ,
    addItem,
    removeItem,
    updateItem,
    setFilter,
    setLangsEdited,
    updateEditableLangs,
    setLangValidationsErrors
} = navigationSlice.actions;