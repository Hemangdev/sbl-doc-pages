import { Navigate, useLocation } from "react-router-dom"
import CheckAuth from "../helper/CheckAuth"
const public_path = process.env.REACT_APP_PUBLIC_URL


const AuthPagesCheck = ({ current }) => {

    const location = useLocation();
    return (
        !CheckAuth() ? current : <Navigate to={`${public_path}/home`} state={{ from: location }} replace />
    )
}

export default AuthPagesCheck