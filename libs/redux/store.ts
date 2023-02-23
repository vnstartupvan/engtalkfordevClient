import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';
import AuthReducer from './reducers/AuthReducer';
import uiReducer from './reducers/uiReducer';

export const store = configureStore({
    reducer: {
        app: appReducer,
        UI: uiReducer,
        auth: AuthReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
