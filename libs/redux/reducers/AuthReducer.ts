import { createSlice } from '@reduxjs/toolkit';
import { IUserResponse } from '@libs/models/user';

export interface initAuthState {
    myProfile: IUserResponse | null;
}

const initialState: initAuthState = {
    myProfile: null,
};

export const appReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log(`Update profile`);
            state.myProfile = action.payload;
        },
        logOut: (state) => {
            state.myProfile = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { updateProfile, logOut } = appReducer.actions;

export default appReducer.reducer;
