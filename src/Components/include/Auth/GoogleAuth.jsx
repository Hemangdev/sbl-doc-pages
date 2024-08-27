import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import { toast } from "react-toastify"
import AxiosHelper from '../../../helper/AxiosHelper';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../Hooks/useProfile';
const public_path = process.env.REACT_APP_PUBLIC_URL
const google_auth_key = process.env.REACT_APP_GOOGLE_AUTH_KEY

const GoogleAuth = () => {

    const navigate = useNavigate();
    const { setData } = useProfile()

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: google_auth_key,
            plugin_name: "chat",
        });
    });

    const googleLogin = async ({ profileObj }) => {
        var dataSubmit = {
            email: profileObj?.email,
            name: profileObj?.name,
            password: profileObj?.googleId,
            image: profileObj?.imageUrl
        }

        var { data } = await AxiosHelper.postData(`register-google`, dataSubmit);
        if (data?.status === true) {
            localStorage.setItem('token', data?.data?.access_token)
            toast.success("Successfully Login..!!");
            setData(data?.data?.user)
            return navigate(`${public_path}/home`);
        }
        else {
            toast.error(data?.message);
        }
    }

    return (
        <div className='text-center my-2 social-login'>
            <GoogleLogin
                clientId={google_auth_key}
                render={renderProps => (
                    <span role="button" className="google btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fa-brands fa-google"></i> Login with Google
                    </span>
                )}
                buttonText="Login"
                onSuccess={googleLogin}
                onFailure={(response) => { toast.error(response.error) }}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleAuth