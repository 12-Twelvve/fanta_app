import { createSlice } from "@reduxjs/toolkit";

const initialState = { online:false};
const onlinePortalSlice = createSlice({
  name: "onlinePortal",
  initialState,
  reducers: {
    trueOnlinePortal(state,) {
       return state.online = true
    },
    falseOnlinePortal(state,) {
       return state.online = false
    },
  }
});

export const { trueOnlinePortal, falseOnlinePortal } = onlinePortalSlice.actions;
const onlinePortalReducer = onlinePortalSlice.reducer;
export default onlinePortalReducer;