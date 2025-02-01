import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/drawer/SidebarSlice";
import sessionsReducer from "../features/drawer/SessionsSlice"
import userReducer from "../features/drawer/UserSlice"
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    sessions: sessionsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
