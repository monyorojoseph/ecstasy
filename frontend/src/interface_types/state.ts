import { authenticationReducerTypes } from "../redux/reducers/authentication";
import { cartReducerType } from "../redux/reducers/cart";
import { deliveryPlanReducerTypes } from "../redux/reducers/delivery_plan";
import { itemReducerTypes } from "../redux/reducers/item";
import { profileReducerTypes } from "../redux/reducers/profile";

export interface stateTypes {
    authentication: authenticationReducerTypes
    profile: profileReducerTypes
    item: itemReducerTypes
    cart: cartReducerType
    delivery_plan: deliveryPlanReducerTypes
}