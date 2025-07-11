import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  exam: string;
  avatar: string;
  birthdate: string;
  _id: string;
  token: string | null; // Assuming token can be null
}

const initialState: User = (() => {
  return {
    username: "",
    email: "",
    exam: "",
    avatar: "",
    birthdate: "",
    _id: "",
    token: null, // Initialize token as null
  };
})();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.exam = action.payload.exam;
        state.avatar = action.payload.avatar;
        state.birthdate = action.payload.birthdate;
        state._id = action.payload._id;
        state.token = action.payload.token;
    },
    clearUser: () => {
      return {
        username: "",
        email: "",
        exam: "",
        avatar: "",
        birthdate: "",
        _id: "",
        token: null,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
