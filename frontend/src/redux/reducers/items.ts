import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    goodie: '',
    goodies: []
}

const itemReducer = createSlice({
    name: 'item',
    initialState,
    reducers: {}
})