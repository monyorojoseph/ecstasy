import { createSlice } from "@reduxjs/toolkit";

export interface messageReducerTypes {
    [key: string]: string | object | string[]
}

const initialState = {
    success: '',
    error: ''
}

const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        SEND_ERROR_MESSAGE: (state, action)=> ({...state, error: action.payload}),
        SEND_SUCCESS_MESSAGE: (state, action)=> ({...state, success: action.payload})
    }
})

export const {
    SEND_ERROR_MESSAGE, SEND_SUCCESS_MESSAGE
} = messageReducer.actions

export default messageReducer.reducer;