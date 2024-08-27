import { useContext } from "react";
import { userProfileData } from '../Context/UserProfileProvider'

const useProfile = () => {
    return useContext(userProfileData);
}

export default useProfile