import axios from "axios";
import { EMPTY_ORDER_ITEM } from "../reducers/cart";
import { 
    FAILED_TO_GET_ITEM, FAILED_TO_GET_ITEMS, GET_ITEM, GET_ITEMS, GOT_ITEMS_SUCCESFULLY, GOT_ITEM_SUCCESFULLY 
} from "../reducers/item";

// get all items
export const getItems = ()=> async(dispatch)=> {
    try{
        dispatch(GET_ITEMS())
        const { data } = await axios.get('http://localhost:8000/item/items')
        dispatch(GOT_ITEMS_SUCCESFULLY(data))
    }catch(error){
        dispatch(FAILED_TO_GET_ITEMS())
        console.log(error)
    }
};

// get item details
export const getItemDetails = (slug)=> async(dispatch, getState)=> {
    try{
        dispatch(GET_ITEM())
        const token = getState().authentication.token
        if(token){
            dispatch(EMPTY_ORDER_ITEM())
        }
        const { data } = await axios.get(`http://localhost:8000/item/item-details/${slug}`)
        dispatch(GOT_ITEM_SUCCESFULLY(data))
    }catch(error){
        dispatch(FAILED_TO_GET_ITEM())
        console.log(error)
    }
};