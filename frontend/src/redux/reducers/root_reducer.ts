import { combineReducers } from "@reduxjs/toolkit";
import authentication from './authentication';
import profile from "./profile";

export default combineReducers({
    authentication, profile
})