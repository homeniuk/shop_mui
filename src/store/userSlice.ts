import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserAPI } from '../api/api';
import { UserState, TypeLoginEnter, TypeLoginReturn, TypeRegisterEnter, TypeRegisterReturn } from '../types/typesUser';
import { AxiosError } from 'axios';

const initialState: UserState = {
    token: '',
    login: '',
    isAuth: false,
    isUserLogining: false,
    errorOnLogin: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout(state) {
            state.token = '';
            state.login = '';
            state.isAuth = false;
        },
        cleanError(state){
            state.errorOnLogin = '';
        }
    },
    extraReducers: (builder)=>{
        builder
        //Login
        .addCase(loginOnServer.pending, (state)=> {
            state.isUserLogining = true;
            state.errorOnLogin = '';
        })
        .addCase(loginOnServer.fulfilled, (state, action)=> {
            state.isUserLogining = false; 
            if (action.payload.message)
                state.errorOnLogin = action.payload.message
            else {
                state.login = action.payload.login;
                state.token = action.payload.access_token;
                state.isAuth = true;
            }             
        })
        .addCase(loginOnServer.rejected, (state, action)=> {
            state.isUserLogining = false;
            if (action.payload)
                state.errorOnLogin = action.payload;
            else
                state.errorOnLogin = null;
        })
        //Register
        .addCase(registerOnServer.pending, (state)=> {
            state.isUserLogining = true;
            state.errorOnLogin = '';
        })
        .addCase(registerOnServer.fulfilled, (state, action)=> {
            state.isUserLogining = false; 
            if (action.payload.message)
                state.errorOnLogin = action.payload.message
            else {
                state.login = action.payload.login;
                state.token = action.payload.access_token;
                state.isAuth = true;
            }             
        })
        .addCase(registerOnServer.rejected, (state, action)=> {
            state.isUserLogining = false;
            if (action.payload)
                state.errorOnLogin = action.payload;
            else
                state.errorOnLogin = null;
        })
      
    }
})

export const { userLogout, cleanError } = userSlice.actions;
export default userSlice.reducer;

// ---------------------- Thunks ---------------------------------------------------------------------------------
export const loginOnServer = createAsyncThunk<TypeLoginReturn, TypeLoginEnter, { rejectValue: string|null }>(
    'user/loginOnServer',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
        let response = await UserAPI.loginOnServer(inputParametr.email, inputParametr.password);
        return (response.data) as TypeLoginReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const registerOnServer = createAsyncThunk<TypeRegisterReturn, TypeRegisterEnter, { rejectValue: string|null }>(
    'user/registerOnServer',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
        let response = await UserAPI.registerOnServer(inputParametr.login, inputParametr.email, inputParametr.password);
        return (response.data) as TypeRegisterReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);
