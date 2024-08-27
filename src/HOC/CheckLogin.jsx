import { Navigate, useLocation } from "react-router-dom"
import CheckAuth from "../helper/CheckAuth"
const public_path = process.env.REACT_APP_PUBLIC_URL

const CheckLogin = ({ current }) => {

    const location = useLocation();
    return (
        CheckAuth() ? current : <Navigate to={`${public_path}/login`} state={{ from: location }} replace />
    )
}

export default CheckLogin