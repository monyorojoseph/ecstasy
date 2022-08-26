import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig } from "../../utils/config";
import { ADDING_ORDER_ITEM, ADDING_ORDER_ITEM_SUCCESFULLY, FAILED_TO_ADD_ORDER_ITEM, 
    FAILED_TO_GET_ORDER_ITEMS, FAILED_TO_REMOVE_ORDER_ITEM, GET_ORDER_ITEMS, GOT_ORDER_ITEMS_SUCCESFULLY, 
    REMOVING_ORDER_ITEM, REMOVING_ORDER_ITEM_SUCCESFULLY } from "../reducers/cart";

interface slugType {
    slug: string
}

// get items in cart
export const getCartItems = ()=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(GET_ORDER_ITEMS())
        const token = getState().authentication.token
        const { data } = await axios.get('http://localhost:8000/cart/my-order-items', tokenConfig(token))
        dispatch(GOT_ORDER_ITEMS_SUCCESFULLY(data))
        console.log(data)
    } catch(error){
        dispatch(FAILED_TO_GET_ORDER_ITEMS())
        console.log(error)
    }
};

// remove item from cart
export const removeItemFromCart = (details: slugType)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(REMOVING_ORDER_ITEM())
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/remove-order-item', details, tokenConfig(token))
        dispatch(REMOVING_ORDER_ITEM_SUCCESFULLY())
        console.log(data)
    } catch(error){
        dispatch(FAILED_TO_REMOVE_ORDER_ITEM())
        console.log(error)
    }
};

// add items to cart
export const addItemToCart = (details: slugType)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(ADDING_ORDER_ITEM())
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/add-order-item', details, tokenConfig(token))
        dispatch(ADDING_ORDER_ITEM_SUCCESFULLY())
        console.log(data)
    } catch(error){
        dispatch(FAILED_TO_ADD_ORDER_ITEM())
        console.log(error)
    }
};