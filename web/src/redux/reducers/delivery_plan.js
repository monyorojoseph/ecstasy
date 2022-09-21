import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    plan: {},
    plans: []
}

const deliveryPlanReducer = createSlice({
    name: 'delivery_plan',
    initialState,
    reducers: {
        GET_DELIVERY_PLANS: (state)=> ({...state, loading: true}),
        SUCCESSFULLY_GOT_DELIVERY_PLANS: (state, action)=> ({...state, loading: false, plans:  action.payload}),
        FIALED_TO_GET_DELIVERY_PLAN: (state)=> ({...state, loading: false})
    }
})

export const {
    GET_DELIVERY_PLANS, SUCCESSFULLY_GOT_DELIVERY_PLANS, FIALED_TO_GET_DELIVERY_PLAN
} = deliveryPlanReducer.actions

export default deliveryPlanReducer.reducer;