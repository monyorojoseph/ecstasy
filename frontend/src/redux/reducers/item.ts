import { createSlice } from "@reduxjs/toolkit";

interface itemsTypes {
    name: string
    slug: string
    price: number
    details: string
    cover_image: string
    [key: string]: number | string
}

export interface itemReducerTypes {
    loading: boolean
    goodie: itemsTypes
    goodies: itemsTypes[]
}

const initialState: itemReducerTypes = {
    loading: false,
    goodie: {
        name: '',
        slug: '',
        price: 0,
        details: '',
        cover_image: ''      
    },
    goodies: []
}

const itemReducer = createSlice({
    name: 'item',
    initialState,
    reducers: {
        GET_ITEM: (state)=> ({...state, loading: true}),
        GOT_ITEM_SUCCESFULLY: (state, action)=> ({...state, loading:false, goodie: action.payload}),
        FAILED_TO_GET_ITEM: (state)=> ({...state, loading: false}),
        GET_ITEMS: (state)=> ({...state, loading: true}),
        GOT_ITEMS_SUCCESFULLY: (state, action)=> ({...state, loading:false, goodies: action.payload}),
        FAILED_TO_GET_ITEMS: (state)=> ({...state, loading: false})
    }
})

export const {
    GET_ITEM, GOT_ITEM_SUCCESFULLY, FAILED_TO_GET_ITEM,
    GET_ITEMS, GOT_ITEMS_SUCCESFULLY, FAILED_TO_GET_ITEMS
    } = itemReducer.actions

export default itemReducer.reducer;