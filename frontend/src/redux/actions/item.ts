import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { EMPTY_ORDER_ITEM } from "../reducers/cart";
import { 
    FAILED_TO_GET_ITEM, FAILED_TO_GET_ITEMS, GET_ITEM, GET_ITEMS, GOT_ITEMS_SUCCESFULLY, GOT_ITEM_SUCCESFULLY 
} from "../reducers/item";
import { SEND_ERROR_MESSAGE } from "../reducers/message";

// get all items
export const getItems = ()=> async(dispatch: Dispatch)=> {
    try{
        dispatch(GET_ITEMS())
        const { data } = await axios.get('http://localhost:8000/item/items')
        dispatch(GOT_ITEMS_SUCCESFULLY(data))
    }catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_GET_ITEMS())
    }
};

// get item details
export const getItemDetails = (slug: string)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(GET_ITEM())
        const token = getState().authentication.token
        if(token){
            dispatch(EMPTY_ORDER_ITEM())
        }
        const { data } = await axios.get(`http://localhost:8000/item/item-details/${slug}`)
        dispatch(GOT_ITEM_SUCCESFULLY(data))
    }catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_GET_ITEM())
    }
};