import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { BasketAPI } from '../api/api';
import {    TypeBasketState,        TypeBasketListReturn, 
            TypeBasketListEnter,    TypeBasketDropEnter, 
            TypeBasketAddEnter,     TypeChangeQuantityReturn,
            TypeChangeQuantityEnter } from '../types/typesBasket'

const initialState: TypeBasketState = {
    list: [],
    listOfAdding: [],
    isLoading: false,
    basketError: '',
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers:{
        toogleAdding(state, action: PayloadAction<number>){
            const id = action.payload;
            let listOfAdding = state.listOfAdding;
            if (listOfAdding.includes(id)) {
                listOfAdding = listOfAdding.filter((n) => { return !(n===id) })
            } else {
                listOfAdding.push(id);
            }
            state.listOfAdding = listOfAdding;
        },
        clearBasket(state){
            state.list        = [];
            state.basketError = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        //get basket -----------------------------------------------------
        .addCase(getBasket.pending, (state)=> {
            state.isLoading   = true;
            state.basketError = '';
        })
        .addCase(getBasket.fulfilled, (state, action)=> {
            state.isLoading = false; 
            if (action.payload.message)
                state.basketError = action.payload.message
            else {
                state.list = action.payload.list;
            }             
        })
        .addCase(getBasket.rejected, (state, action)=> {
            state.isLoading = false;
            if (action.payload)
                state.basketError = action.payload;
            else
                state.basketError = null;
        })
        //drop from basket -----------------------------------------------------
        .addCase(dropFromBasket.pending, (state)=> {
            state.isLoading   = true;
            state.basketError = '';
        })
        .addCase(dropFromBasket.fulfilled, (state, action)=> {
            state.isLoading = false; 
            if (action.payload.message)
                state.basketError = action.payload.message
            else {
                state.list = action.payload.list;
            }             
        })
        .addCase(dropFromBasket.rejected, (state, action)=> {
            state.isLoading = false;
            if (action.payload)
                state.basketError = action.payload;
            else
                state.basketError = null;
        })
        //add to basket -----------------------------------------------------
        .addCase(addToBasket.pending, (state)=> {
            state.isLoading   = true;
            state.basketError = '';
        })
        .addCase(addToBasket.fulfilled, (state, action)=> {
            state.isLoading = false; 
            if (action.payload.message)
                state.basketError = action.payload.message
            else {
                state.list = action.payload.list;
            }             
        })
        .addCase(addToBasket.rejected, (state, action)=> {
            state.isLoading = false;
            if (action.payload)
                state.basketError = action.payload;
            else
                state.basketError = null;
        })
        //change quantity -----------------------------------------------------
        .addCase(changeQuantity.pending, (state)=> {
            //state.isLoading   = true;
            state.basketError = '';
        })
        .addCase(changeQuantity.fulfilled, (state, action)=> {
            //state.isLoading = false; 
            if (action.payload.message)
                state.basketError = action.payload.message
            else {
                state.list = action.payload.list;
                //state.list = action.payload.;
                /*const id = action.payload.id;
                let list = state.list;
                for(let line of list){
                    if (line.id === id)
                        line.quantity = action.payload.quantity;  
                }
                state.list = list;*/
            }             
        })
        .addCase(changeQuantity.rejected, (state, action)=> {
            //state.isLoading = false;
            if (action.payload)
                state.basketError = action.payload;
            else
                state.basketError = null;
        })

    }
})

export const { clearBasket, toogleAdding } = basketSlice.actions;
export default basketSlice.reducer;

// ---------------------- Thunks ---------------------------------------------------------------------------------

export const getBasket = createAsyncThunk<TypeBasketListReturn, TypeBasketListEnter, { rejectValue: string|null }>(
    'basket/getBasket',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            let response = await BasketAPI.getBasket(inputParametr.token);
            return (response.data) as TypeBasketListReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const dropFromBasket = createAsyncThunk<TypeBasketListReturn, TypeBasketDropEnter, { rejectValue: string|null }>(
    'basket/dropFromBasket',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            let response = await BasketAPI.dropFromBasket(inputParametr.token, inputParametr.id);
            return (response.data) as TypeBasketListReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const addToBasket = createAsyncThunk<TypeBasketListReturn, TypeBasketAddEnter, { rejectValue: string|null }>(
    'basket/addToBasket',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            dispatch(toogleAdding(inputParametr.id));
            console.log(inputParametr);
            let response = await BasketAPI.addToBasket(inputParametr.token, inputParametr.id);
            dispatch(toogleAdding(inputParametr.id));
            return (response.data) as TypeBasketListReturn;
        } catch (err: any) {
            dispatch(toogleAdding(inputParametr.id));
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const changeQuantity = createAsyncThunk<TypeBasketListReturn, TypeChangeQuantityEnter, { rejectValue: string|null }>(
    'basket/changeQuantity',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            dispatch(toogleAdding(inputParametr.id));
            let response = await BasketAPI.changeQuantity(inputParametr.token, inputParametr.id, inputParametr.quantity);
            dispatch(toogleAdding(inputParametr.id));
            return (response.data) as TypeBasketListReturn;
        } catch (err: any) {
            dispatch(toogleAdding(inputParametr.id));
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);