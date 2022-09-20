import { createSlice } from "@reduxjs/toolkit";

export interface reviewType{
    comment: string
}

export interface reviewReducerType {
    adding: boolean
    removing: boolean
    review: reviewType
}

const initialState: reviewReducerType = {
    adding: false,
    removing: false,
    review: {
        comment: ''
    }
}
const reviewReducer = createSlice({
    name: 'review',
    initialState,
    reducers: {}
});

export const {} = reviewReducer.actions;

export default reviewReducer.reducer;