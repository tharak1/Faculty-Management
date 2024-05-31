import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice";
import drawerReducer from './DrawerSlice'


const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    theme:themeReducer,
    drawer: drawerReducer,
});

const persistedReducer = persistReducer(persistConfig,reducer);


export const store = configureStore({
    reducer : persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;