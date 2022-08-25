import { createSlice } from "@reduxjs/toolkit";

interface userTypes {
    email: string
    username: string    
}

export interface profileReducerTypes {
    loading: boolean
    user: userTypes
}

const initialState: profileReducerTypes = {
    loading: false,
    user: {
        email: '',
        username: ''
    }
}

const profileReducer = createSlice({
    name: 'profile',
    initialState, 
    reducers: {
        GET_USER: (state)=> ({...state, loading:true}),
        GET_USER_SUCCESFULLY: (state, action)=> ({...state, loading: false, user: action.payload}),
        FAILED_TO_GET_USER: (state)=> ({...state, loading:false})
    }
})

export const {
    GET_USER, GET_USER_SUCCESFULLY, FAILED_TO_GET_USER
} = profileReducer.actions

export default profileReducer.reducer