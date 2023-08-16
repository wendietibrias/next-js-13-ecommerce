import { createSlice } from "@reduxjs/toolkit";

type AlertState = {
    message:string;
    variant:string;
    open:boolean;
}

const alertSlice = createSlice({
    name:'alertSlice',
    initialState: {
        message:"",
        variant:"",
        open:false 
    } as AlertState, 
    reducers: {
        openAlert(state : AlertState, { payload }) {
            state.open = true;
            state.message = payload.message;
            state.variant = payload.variant;

            return state;
        },
        closeAlert(state : AlertState) {
            state.variant = "";
            state.message = "";
            state.open = false;

            return state;
        }
    }
});

export const { openAlert,closeAlert }  = alertSlice.actions;
export default alertSlice.reducer;