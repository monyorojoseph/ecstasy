import { connect } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({children, authentication})=> {
    const { token } = authentication
    let location = useLocation();
    if (token){
        return children;
    }
    return <Navigate to='/sign-in' state={{ from: location }} replace />
}

const mapStateToProps = (state)=> ({
    authentication: state.authentication
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
