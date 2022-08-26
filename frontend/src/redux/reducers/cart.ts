import { createSlice } from "@reduxjs/toolkit";

interface itemType {
    name: string
    slug: string
    price: number
    details: string
}

interface orderItemType {
    id: number
    quantity: number
    item: itemType
    cover_image: string
}

export interface cartReducerType {
    loading: boolean
    adding: boolean
    removing: boolean
    order_item: orderItemType
    order_items: orderItemType[]
}

const initialState: cartReducerType = {
    loading: false,
    adding: false,
    removing: false,
    order_item: {
        id: 0,
        quantity: 1,
        item: {
            name: '',
            slug: '',
            price: 0,
            details: '' 
        },
        cover_image: ''
    },
    order_items: []
}

const cartReducer = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        ADDING_ORDER_ITEM: (state)=> ({...state, adding: true}),
        ADDING_ORDER_ITEM_SUCCESFULLY: (state)=> ({...state, adding: false}),
        FAILED_TO_ADD_ORDER_ITEM: (state)=> ({...state, adding:false}),
        REMOVING_ORDER_ITEM: (state)=> ({...state, removing: true}),
        REMOVING_ORDER_ITEM_SUCCESFULLY: (state)=> ({...state, removing: false}),
        FAILED_TO_REMOVE_ORDER_ITEM: (state)=> ({...state, removing:false}),
        GET_ORDER_ITEMS: (state)=> ({...state, loading: true}),
        GOT_ORDER_ITEMS_SUCCESFULLY: (state, action)=> ({...state, loading: false, order_items: action.payload}),
        FAILED_TO_GET_ORDER_ITEMS: (state)=> ({...state, loading: false})
    }
})

export const {
    ADDING_ORDER_ITEM, ADDING_ORDER_ITEM_SUCCESFULLY, FAILED_TO_ADD_ORDER_ITEM,
    REMOVING_ORDER_ITEM, REMOVING_ORDER_ITEM_SUCCESFULLY, FAILED_TO_REMOVE_ORDER_ITEM,
    GET_ORDER_ITEMS, GOT_ORDER_ITEMS_SUCCESFULLY, FAILED_TO_GET_ORDER_ITEMS
} = cartReducer.actions

export default cartReducer.reducer;