import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Auth {
  token: string | null; // Assuming token can be null
}

const initialState: Auth = (() => {
  return {
    token: null,
  };
})();


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Auth>) => {
        state.token = action.payload.token;
    },
    clearAuth: () => {
      return {
        token: null,
      };
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
