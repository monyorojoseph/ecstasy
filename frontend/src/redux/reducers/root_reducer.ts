import { combineReducers } from "@reduxjs/toolkit";
import authentication from './authentication';
import profile from "./profile";
import item from "./item";
import cart from "./cart";

export default combineReducers({
    authentication, profile, item, cart
})