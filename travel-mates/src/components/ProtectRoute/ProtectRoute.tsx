import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/AuthStore";

export default function ProtectRoute() {

    const { access_token } = useAuthStore();

    if (access_token) {
        return <Outlet/>;
    }
    
    return <Navigate to="/sign-in" replace />
}