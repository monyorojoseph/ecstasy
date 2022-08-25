import { createSlice } from "@reduxjs/toolkit";

export interface authenticationReducerTypes {
    creating: boolean
    loading: boolean
    token: string
    [key: string]: boolean | string | object
}

const initialState: authenticationReducerTypes = {
    creating: false,
    loading: false,
    created: false,
    token: localStorage.getItem('authCred') ? JSON.parse(localStorage.getItem('authCred')).access : '',
}

const authenticationReducer = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        CREATE_USER: (state)=> ({...state, creating:true}),
        CREATED_USER_SUCCESFULLY: (state)=> ({...state, creating: false, created: true}),
        FAILED_TO_CREATE_USER: (state)=> ({...state, creating: false}),
        LOGIN_USER: (state)=> ({...state, loading: true}),
        LOGGED_IN_USER_SUCCESFULLY: (state, action)=> ({...state, loading: false, token: action.payload}),
        FAILED_TO_LOGIN_USER: (state)=> ({...state, loading: false})
    }
})

export const {
    CREATE_USER, CREATED_USER_SUCCESFULLY, FAILED_TO_CREATE_USER,
    LOGIN_USER, LOGGED_IN_USER_SUCCESFULLY, FAILED_TO_LOGIN_USER

} = authenticationReducer.actions

export default authenticationReducer.reducer;