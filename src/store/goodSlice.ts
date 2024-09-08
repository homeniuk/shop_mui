import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GoodAPI } from '../api/api';
import { TypeGoodsState, TypeGoodsListReturn, TypeGoodsListEnter, TypeOfSingleGood, TypeOfSingleGoodEnter, TypeSingleGoodReturn } from '../types/typesGoods'

const defSingleGood:TypeSingleGoodReturn = {
    message:    '',
    id:         0,
    name:       '',
    description:'',
    image:      '',
    price:      0,
    rating:     0,
    catalog:    '',
}

const initialState: TypeGoodsState = {
    goodsList:      [],
    singleGood:     defSingleGood,
    isGoodsLoading: false,
    errorOnGoods:   ''
}



const goodSlice = createSlice({
    name: 'good',
    initialState,
    reducers:{
        clearListOfGoods(state){
            state.goodsList     = [];
            state.errorOnGoods  = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        //download section
        .addCase(downloadSectionOfGoods.pending, (state)=> {
            state.isGoodsLoading    = true;
            state.errorOnGoods      = '';
        })
        .addCase(downloadSectionOfGoods.fulfilled, (state, action)=> {
            state.isGoodsLoading = false; 
            if (action.payload.message)
                state.errorOnGoods = action.payload.message
            else {
                state.goodsList = action.payload.goodsList;
            }           
        })
        .addCase(downloadSectionOfGoods.rejected, (state, action)=> {
            state.isGoodsLoading = false;
            if (action.payload)
                state.errorOnGoods = action.payload;
            else
                state.errorOnGoods = null;
        })
        //download single page
        .addCase(downloadGoodInfo.pending, (state)=> {
            state.isGoodsLoading    = true;
            state.errorOnGoods      = '';
        })
        .addCase(downloadGoodInfo.fulfilled, (state, action)=> {
            state.isGoodsLoading = false; 
            if (action.payload.message)
                state.errorOnGoods = action.payload.message
            else {
                state.singleGood = action.payload;
            }             
        })
        .addCase(downloadGoodInfo.rejected, (state, action)=> {
            state.isGoodsLoading = false;
            if (action.payload)
                state.errorOnGoods = action.payload;
            else
                state.errorOnGoods = null;
        })
    },
})

export const { clearListOfGoods } = goodSlice.actions;
export default goodSlice.reducer;


// ---------------------- Thunks ---------------------------------------------------------------------------------
export const downloadSectionOfGoods = createAsyncThunk<TypeGoodsListReturn, TypeGoodsListEnter, { rejectValue: string|null }>(
    'good/downloadSectionOfGoods',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            let response = await GoodAPI.downloadSectionOfGoods(inputParametr.section);
        return (response.data) as TypeGoodsListReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);

export const downloadGoodInfo = createAsyncThunk<TypeSingleGoodReturn, TypeOfSingleGoodEnter, { rejectValue: string|null }>(
    'good/downloadGoodInfo',
    async function (inputParametr, { rejectWithValue, dispatch }) {
        try {
            let response = await GoodAPI.downloadGoodInfo(inputParametr.id);
            return (response.data) as TypeSingleGoodReturn;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message);
        }
    }
);