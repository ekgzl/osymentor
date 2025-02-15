import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/drawer/SidebarSlice";
import sessionsReducer from "../features/drawer/SessionsSlice"
import userReducer from "../features/drawer/UserSlice"
import stepperReducer from "../features/drawer/StepperSlice"
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    sessions: sessionsReducer,
    user: userReducer,
    stepper: stepperReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
