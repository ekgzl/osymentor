import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Session {
    time: String;
}
interface SessionsState{
    sessions: Session[];
}

const initialState: SessionsState = (() => {
    try {
        const storedState = localStorage.getItem('sessions');
        if (storedState) {
            const parsedState = JSON.parse(storedState)
            return  Array.isArray(parsedState) ? { sessions: parsedState } : parsedState;
        }
    } catch (e) {
        console.error("Locale erişim hatası", e)
    }
    return { sessions: [] };
})();

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<Session>) => {
        state.sessions.push(action.payload)
    },
    setSessions: (state, action: PayloadAction<Session[]>) =>{
        state.sessions = action.payload;
    }
  },
});

export const { addSession, setSessions} = sessionsSlice.actions;

export default sessionsSlice.reducer;
