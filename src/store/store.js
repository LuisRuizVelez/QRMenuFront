import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

//import storage from 'redux-persist/lib/storage'; // Usa localStorage
import sessionStorage from 'redux-persist/lib/storage/session'; // Usa sessionStorage

import {authSlice} from "./auth/authSlice";
import {navigationSlice} from "./navigation/navigationSlice";
import {uiSlice} from "./ui/uiSlice";



// configuración de la persistencia
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};



// Combina los reducers
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    navigation: navigationSlice.reducer,
    ui: uiSlice.reducer,
});



// Aplica persistencia al reducer combinado
const persistedReducer = persistReducer(persistConfig, rootReducer);



// Configura el store persistente
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    }
);



export const persistor = persistStore(store);


export default store;