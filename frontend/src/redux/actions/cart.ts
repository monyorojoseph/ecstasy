import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenConfig } from "../../utils/config";
import { ADDING_ORDER_ITEM, ADDING_ORDER_ITEM_SUCCESFULLY, CHECKOUT, EMPTY_ORDER_ITEM, FAILED_TO_ADD_ORDER_ITEM, 
    FAILED_TO_CHECKOUT, 
    FAILED_TO_GET_ORDER_ITEMS, FAILED_TO_REMOVE_ORDER_ITEM, GET_ORDER_ITEMS, GOT_ORDER_ITEMS_SUCCESFULLY, 
    GOT_ORDER_ITEM_SUCCESFULLY, 
    GOT_TOTAL_SUCCESFULLY, 
    REMOVING_ORDER_ITEM, REMOVING_ORDER_ITEM_SUCCESFULLY, SUCCESSFULLY_CHECKOUT, SUCCESSFULLY_GOT_USER_ADDRESS } from "../reducers/cart";
import { SEND_ERROR_MESSAGE } from "../reducers/message";

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
    } catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_GET_ORDER_ITEMS())
    }
};

// remove item from cart
export const removeItemFromCart = (details: slugType)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(REMOVING_ORDER_ITEM())
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/remove-order-item', details, tokenConfig(token))
        dispatch(REMOVING_ORDER_ITEM_SUCCESFULLY(data))
    } catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_REMOVE_ORDER_ITEM())
    }
};

// add items to cart
export const addItemToCart = (details: slugType)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(ADDING_ORDER_ITEM())
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/add-order-item', details, tokenConfig(token))
        dispatch(ADDING_ORDER_ITEM_SUCCESFULLY(data))
    } catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_ADD_ORDER_ITEM())
    }
};

// // get total items in cart
export const getTotalItemsInCart = () => async(dispatch: Dispatch, getState:Function)=> {
    try{
        const token = getState().authentication.token
        const { data } = await axios.get('http://localhost:8000/cart/total-order-items', tokenConfig(token))
        localStorage.setItem('totalItems', JSON.stringify(data))
        dispatch(GOT_TOTAL_SUCCESFULLY(data))
    }catch(error){
        console.log(error)
    }
};

// get order item
export const getOrderItem = (details: slugType)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/get-order-item', details, tokenConfig(token))
        dispatch(GOT_ORDER_ITEM_SUCCESFULLY(data))
    } catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(EMPTY_ORDER_ITEM())
    }
}

// checkout

interface checkoutTypes {
    delivery: number
    town: string
    defaultAddress: boolean
    useDefaultAddress: boolean
}
export const checkout = (details: checkoutTypes)=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        dispatch(CHECKOUT());
        const token = getState().authentication.token
        const { data } = await axios.post('http://localhost:8000/cart/checkout', details, tokenConfig(token));
        dispatch(SUCCESSFULLY_CHECKOUT(data))
    }catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FAILED_TO_CHECKOUT())
    }
}

// get user default address
export const getUserDefaultAddress = ()=> async(dispatch: Dispatch, getState: Function)=> {
    try{
        const token = getState().authentication.token
        const { data } = await axios.get('http://localhost:8000/cart/default-address', tokenConfig(token))
        dispatch(SUCCESSFULLY_GOT_USER_ADDRESS(data))
    }catch(error){
        console.log(error.response.data ? error.response.data : error.message)
    }
}