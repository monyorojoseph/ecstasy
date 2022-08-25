import { authenticationReducerTypes } from "../redux/reducers/authentication";
import { profileReducerTypes } from "../redux/reducers/profile";

export interface stateTypes {
    authentication: authenticationReducerTypes
    profile: profileReducerTypes
}