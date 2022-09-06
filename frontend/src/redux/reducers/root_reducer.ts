import { combineReducers } from "@reduxjs/toolkit";
import authentication from './authentication';
import profile from "./profile";
import item from "./item";
import cart from "./cart";
import delivery_plan from "./delivery_plan";

export default combineReducers({
    authentication, profile, item, cart, delivery_plan
})