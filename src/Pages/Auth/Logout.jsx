import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useProfile from "../../Hooks/useProfile";
const public_path = process.env.REACT_APP_PUBLIC_URL

const Logout = () => {
    const { setData } = useProfile();

    useEffect(() => {
        var reset = {
            "id": null,
            "mobile": "",
            "email": "",
            "image": "",
            "status": "",
            "rolename": "",
            "accessToken": ""
        }
        setData(reset)

        localStorage.removeItem('token')
    }, [setData])

    return <Navigate to={`${public_path}/login`} />
}

export default Logout