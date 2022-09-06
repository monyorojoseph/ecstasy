import { createSlice } from "@reduxjs/toolkit";

interface addressType {
    town: string
    longtitude: number
    latitude: number
}

interface itemType {
    name: string
    slug: string
    price: number
    details: string
}

export interface orderItemType {
    id: number
    quantity: number
    item: itemType
    cover_image: string
    item_total_price: number
}

export interface cartReducerType {
    loading: boolean
    adding: boolean
    removing: boolean
    checkout: boolean
    order_item: orderItemType
    order_items: orderItemType[]
    total: {
        total: string
    }
    address: addressType
}

const initialOrderItemState = {
    id: 0,
    quantity: 0,
    item: {
        name: '',
        slug: '',
        price: 0,
        details: '' 
    },
    cover_image: '',
    item_total_price: 0

}

const initialState: cartReducerType = {
    loading: false,
    adding: false,
    removing: false,
    checkout: false,
    order_item: initialOrderItemState,
    order_items: [],
    total: JSON.parse(localStorage.getItem('totalItems') || '{}'),
    address: {
        town: '',
        longtitude: 0,
        latitude: 0
    }
}

const cartReducer = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        ADDING_ORDER_ITEM: (state)=> ({...state, adding: true}),
        ADDING_ORDER_ITEM_SUCCESFULLY: (state, action)=> ({...state, adding: false, order_item: action.payload}),
        FAILED_TO_ADD_ORDER_ITEM: (state)=> ({...state, adding:false}),
        REMOVING_ORDER_ITEM: (state)=> ({...state, removing: true}),
        REMOVING_ORDER_ITEM_SUCCESFULLY: (state, action)=> ({...state, removing: false, order_item: action.payload}),
        FAILED_TO_REMOVE_ORDER_ITEM: (state)=> ({...state, removing:false}),
        GET_ORDER_ITEMS: (state)=> ({...state, loading: true}),
        GOT_ORDER_ITEMS_SUCCESFULLY: (state, action)=> ({...state, loading: false, order_items: action.payload}),
        FAILED_TO_GET_ORDER_ITEMS: (state)=> ({...state, loading: false}),
        GOT_ORDER_ITEM_SUCCESFULLY: (state, action)=> ({...state, loading: false, order_item: action.payload}),
        EMPTY_ORDER_ITEM: (state)=> ({...state, order_item: initialOrderItemState }),
        GOT_TOTAL_SUCCESFULLY: (state, action)=> ({...state, total:action.payload}),
        CHECKOUT: (state)=> ({...state, loading: true}),
        SUCCESSFULLY_CHECKOUT: (state, action)=> ({...state, loading: false, checkout: action.payload.checkout}),
        FAILED_TO_CHECKOUT: (state)=> ({...state, loading: false}),
        SUCCESSFULLY_GOT_USER_ADDRESS: (state, action)=> ({...state, address: action.payload}),

    }
})

export const {
    ADDING_ORDER_ITEM, ADDING_ORDER_ITEM_SUCCESFULLY, FAILED_TO_ADD_ORDER_ITEM,
    REMOVING_ORDER_ITEM, REMOVING_ORDER_ITEM_SUCCESFULLY, FAILED_TO_REMOVE_ORDER_ITEM,
    GET_ORDER_ITEMS, GOT_ORDER_ITEMS_SUCCESFULLY, FAILED_TO_GET_ORDER_ITEMS,
    GOT_ORDER_ITEM_SUCCESFULLY, GOT_TOTAL_SUCCESFULLY, EMPTY_ORDER_ITEM,
    CHECKOUT, SUCCESSFULLY_CHECKOUT, FAILED_TO_CHECKOUT,
    SUCCESSFULLY_GOT_USER_ADDRESS
} = cartReducer.actions

export default cartReducer.reducer;