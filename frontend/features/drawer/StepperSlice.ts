import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    subject: "",
    subjectId: "",
    type: "",
    topic: "",
    topicId: "",
    duration: 0,
    questionNumber: 0,
}

const stepperSlice = createSlice({
    name: "stepper",
    initialState,
    reducers: {
        nextStep(state) {
            state.step += 1;
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
        },
        setSubjectId(state, action: PayloadAction<string>) {
            state.subjectId = action.payload;
        },
        setTopicId(state, action: PayloadAction<string>) {
            state.topicId = action.payload;
        },
        setDuration(state, action: PayloadAction<number>) {
            state.duration = action.payload;
        },
    }
})

export default stepperSlice.reducer;
export const {nextStep, prevStep, setStep, setSubject, setType, setTopic, setQuestionNumber, setSubjectId, setTopicId, setDuration} = stepperSlice.actions;