import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    step: 0,
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
    }
})

export default stepperSlice.reducer;
export const {nextStep, prevStep} = stepperSlice.actions;