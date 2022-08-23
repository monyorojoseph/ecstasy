import { useLocation, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute = ({children}:ProtectedRouteProps)=> {
    let location = useLocation();
    const token = 'josseph'
    if (token){
        return children;
    }
    return <Navigate to='/sign-in' state={{ from: location }} replace />
}

export default ProtectedRoute;
