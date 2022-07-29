import { useAuth } from "../../contexts/Auth/useAuth"
import { Navigate } from "react-router-dom"

export const ProtectedLayout = ({ children }: { children: JSX.Element}) => {
    const auth = useAuth();

    if(auth.name === undefined){
        Navigate({ to: "/login"})
    }

    return children;
}