import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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