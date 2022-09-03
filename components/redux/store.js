import { configureStore } from "@reduxjs/toolkit";
import tableOrderReducer from "./tableOrderSlice";
import kotReducer from "./kotSlice";
import onlinePortalReducer from "./onlinePortal";

const store = configureStore({
  reducer: {
    table_order: tableOrderReducer,
    kot: kotReducer,
    online_portal :onlinePortalReducer,
  },
});

export default store;