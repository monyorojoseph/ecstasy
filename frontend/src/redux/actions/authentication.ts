import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { signinTypes } from "../../interface_types/signin";
import { signupTypes } from "../../interface_types/signup";
import { config } from "../../utils/config";
import { CREATED_USER_SUCCESFULLY, CREATE_USER, FAILED_TO_CREATE_USER, FAILED_TO_LOGIN_USER, LOGGED_IN_USER_SUCCESFULLY, LOGIN_USER } from "../reducers/authentication";

// sign up or creation of account
export const createUser = (details: signupTypes)=> async(dispatch: Dispatch)=> {
    try{
        dispatch(CREATE_USER());
        const { data } = await axios.post('/auth/users/', details, config)
        dispatch(CREATED_USER_SUCCESFULLY())
        console.log(data)
    } catch(error){
        dispatch(FAILED_TO_CREATE_USER());
        console.log(error)
    }
};

// signin
export const signIn = (details: signinTypes)=> async(dispatch: Dispatch)=> {
    try{
        dispatch(LOGIN_USER());
        const { data } = await axios.post('/auth/jwt/create/', details, config)
        localStorage.setItem('authCred', JSON.stringify(data))
        dispatch(LOGGED_IN_USER_SUCCESFULLY(data.access))
    } catch(error){
        dispatch(FAILED_TO_LOGIN_USER())
        console.log(error)
    }
};

// reset password
export const resetPassword = ()=> {};

// change password
export const changePassword = ()=> {};
