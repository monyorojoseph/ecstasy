import { connect } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { stateTypes } from "./interface_types/state";
import { authenticationReducerTypes } from "./redux/reducers/authentication";

interface ProtectedRouteProps {
    children: JSX.Element
    authentication: authenticationReducerTypes
}

const ProtectedRoute = ({children, authentication}:ProtectedRouteProps)=> {
    const { token } = authentication
    let location = useLocation();
    if (token){
        return children;
    }
    return <Navigate to='/sign-in' state={{ from: location }} replace />
}

const mapStateToProps = (state: stateTypes)=> ({
    authentication: state.authentication
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
