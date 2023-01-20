import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slice/books";

const rootReducer = combineReducers({
    books: booksReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
