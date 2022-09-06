import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { FIALED_TO_GET_DELIVERY_PLAN, GET_DELIVERY_PLANS, SUCCESSFULLY_GOT_DELIVERY_PLANS } from "../reducers/delivery_plan";
import { SEND_ERROR_MESSAGE } from "../reducers/message";
// get delivery plans
export const getDeliveryPlans = ()=> async(dispatch:Dispatch)=> {
    try{
        dispatch(GET_DELIVERY_PLANS());
        const { data } = await axios.get('http://localhost:8000/cart/delivery-plans');
        dispatch(SUCCESSFULLY_GOT_DELIVERY_PLANS(data));
    }catch(error){
        const msg = error.response.data ? error.response.data : error.message
        dispatch(SEND_ERROR_MESSAGE(msg))
        dispatch(FIALED_TO_GET_DELIVERY_PLAN());
    }
}