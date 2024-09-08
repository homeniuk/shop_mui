import { configureStore } from "@reduxjs/toolkit";
import userReduscer from './userSlice';
import goodReduscer from './goodSlice';
import basketReducer from './basketSlice';

const store = configureStore({
    reducer: {
        user: userReduscer,
        good: goodReduscer,
        basket: basketReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch