import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig } from "../../utils/config";
import { FAILED_TO_GET_USER, GET_USER, GET_USER_SUCCESFULLY } from "../reducers/profile";

// get user details
export const userDetails = ()=> async(dispatch: Dispatch, getState:Function)=> {
    try{
        dispatch(GET_USER());
        const token = getState().authentication.token
        const { data } = await axios.get('http://localhost:8000/auth/users/me/', tokenConfig(token))
        dispatch(GET_USER_SUCCESFULLY(data))
    } catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_GET_USER())
    }
};

// change user deatils
export const changeUserDetails = ()=> {};

// delete user
export const removeUser = ()=> {};