import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  exam: string;
  avatar: string;
  birthdate: string;
}

const initialState: User = (() => {
  try {
    const storedState = localStorage.getItem('user');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      return parsedState;
    }
  } catch (error) {
    console.error("Locale erişim hatası", error);
  }
  return {
    username: "",
    email: "",
    exam: "",
    avatar: "",
    birthdate: "",
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
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
