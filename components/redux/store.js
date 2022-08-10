import { configureStore } from "@reduxjs/toolkit";
import tableOrderReducer from "./tableOrderSlice";
import kotReducer from "./kotSlice";
const store = configureStore({
  reducer: {
    table_order: tableOrderReducer,
    kot: kotReducer,
  },
});

export default store;