import { configureStore } from "@reduxjs/toolkit";
import tableOrderReducer from "./tableOrderSlice";

const store = configureStore({
  reducer: {
    table_order: tableOrderReducer,
  },
});

export default store;