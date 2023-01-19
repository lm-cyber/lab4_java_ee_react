import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from "@reduxjs/toolkit";

export interface CurrentPageState {
    page: number;
    sortReverse: boolean;
}

const initialState: CurrentPageState = {
    page: 1,
    sortReverse: true
}

const currentPageSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
        setPage: (state: CurrentPageState, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setReverse: (state: CurrentPageState, action: PayloadAction<boolean>) => {
            state.sortReverse = action.payload
        }
    }
});

const { actions, reducer: currentPageReducer } = currentPageSlice;
export const {setPage, setReverse} = actions;

export default currentPageReducer;
