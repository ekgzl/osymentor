import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    subject: "",
    type: "",
    topic: "",
    questionNumber: 0,
}

const stepperSlice = createSlice({
    name: "stepper",
    initialState,
    reducers: {
        nextStep(state) {
            state.step += 1;
            console.log(state.step)
        },
        prevStep(state) {
            state.step -= 1;
        },
        setStep(state, action: PayloadAction<number>) {
            state.step = action.payload;
        },
        setSubject(state, action: PayloadAction<string>) {
            state.subject = action.payload;
        },
        setType(state, action: PayloadAction<string>) {
            state.type = action.payload;
        },
        setTopic(state, action: PayloadAction<string>) {
            state.topic = action.payload;
        },
        setQuestionNumber(state, action: PayloadAction<number>) {
            state.questionNumber = action.payload;
        }
    }
})

export default stepperSlice.reducer;
export const {nextStep, prevStep, setStep, setSubject, setType, setTopic, setQuestionNumber} = stepperSlice.actions;