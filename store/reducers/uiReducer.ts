import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
    value: number;
}

const initialState: UIState = {
    value: 0,
};

export const UIReducer = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log(123);

            state.value += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment } = UIReducer.actions;

export default UIReducer.reducer;
