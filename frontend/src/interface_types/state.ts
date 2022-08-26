import { authenticationReducerTypes } from "../redux/reducers/authentication";
import { itemReducerTypes } from "../redux/reducers/item";
import { profileReducerTypes } from "../redux/reducers/profile";

export interface stateTypes {
    authentication: authenticationReducerTypes
    profile: profileReducerTypes
    item: itemReducerTypes
}