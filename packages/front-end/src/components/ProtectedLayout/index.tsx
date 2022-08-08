import { useAuth } from "../../contexts/Auth/useAuth"
import { Navigate } from "react-router-dom"

export const ProtectedLayout = ({ children }: { children: JSX.Element}) => {
    const auth = useAuth();

    if(auth.name === null ||  auth.name === ""){
        Navigate({ to: "/login"})
    }

    return children;
}