import {configureStore} from '@reduxjs/toolkit';
import shoppingReducer from "./utils/shoppingSlice"

const store = configureStore({
    reducer: {
        shopping: shoppingReducer,
    }
})

export default store