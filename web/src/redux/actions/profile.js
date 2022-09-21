import axios from "axios";
import { tokenConfig } from "../../utils/config";
import { FAILED_TO_GET_USER, GET_USER, GET_USER_SUCCESFULLY } from "../reducers/profile";

// get user details
export const userDetails = ()=> async(dispatch, getState)=> {
    try{
        dispatch(GET_USER());
        const token = getState().authentication.token
        const { data } = await axios.get('http://localhost:8000/auth/users/me/', tokenConfig(token))
        dispatch(GET_USER_SUCCESFULLY(data))
    } catch(error){
        dispatch(FAILED_TO_GET_USER())
        console.log(error)
    }
};

// change user deatils
export const changeUserDetails = ()=> {};

// delete user
export const removeUser = ()=> {};