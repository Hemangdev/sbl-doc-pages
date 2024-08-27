import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { toast } from "react-toastify"
import AxiosHelper from '../../../helper/AxiosHelper';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../Hooks/useProfile';
const public_path = process.env.REACT_APP_PUBLIC_URL
const facebook_auth_key = process.env.REACT_APP_FACEBOOK_AUTH_KEY

const Facebook = () => {

    const navigate = useNavigate();
    const { setData } = useProfile();

    const responseFacebook = async (response) => {

        var dataSubmit = {
            email: response?.email,
            name: response?.name,
            password: response?.userID,
            image: response?.picture?.data?.url
        }

        var { data } = await AxiosHelper.postData(`register-google`, dataSubmit);
        if (data?.status === true) {
            localStorage.setItem('token', data?.data?.access_token)
            toast.success("Successfully Login..!!");
            setData(data?.data?.user)
            navigate(`${public_path}/home`);
            window.location.reload()
        }
        else {
            toast.error(data?.message);
        }
    }

    return (
        <div className='text-center my-2 social-login'>
            <FacebookLogin
                appId={facebook_auth_key}
                onClick
                fields="name,email,picture"
                scope="public_profile,email,user_birthday"
                callback={responseFacebook}
                render={renderProps => (
                    <span role="button" className="fb btn" onClick={renderProps.onClick}>
                        <i className="fa-brands fa-facebook"></i> Login with Facebook
                    </span>

                )}
            />
        </div>
    )
}

export default Facebook