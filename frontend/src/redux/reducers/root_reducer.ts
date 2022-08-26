import { combineReducers } from "@reduxjs/toolkit";
import authentication from './authentication';
import profile from "./profile";
import item from "./item";

export default combineReducers({
    authentication, profile, item
})