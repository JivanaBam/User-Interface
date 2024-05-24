import { configureStore } from "@reduxjs/toolkit";
import sncakbarReducer from "./slices/snackbarSlice";

const reduxStore = configureStore({
  reducer: {
    sncakbar: sncakbarReducer,
  },
});

export default reduxStore;
