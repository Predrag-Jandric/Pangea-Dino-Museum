import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "./utils/shoppingSlice";
import { loadState, saveState } from "./utils/localStorage";

// load the state from local storage if present
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

// uncomment to remove local storage
// localStorage.removeItem("appState");

export default store;
