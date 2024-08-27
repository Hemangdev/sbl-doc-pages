import React, { useState, useEffect, useCallback, createContext } from "react";
import AxiosHelper from '../helper/AxiosHelper'

var userData = {
    "id": null,
    "mobile": "",
    "name": "",
    "email": "",
    "image": "",
    "status": "",
    "access_token": localStorage.getItem('token'),
    setData: () => null,
    updateData: () => null,
}

export const userProfileData = createContext(userData)

const UserProfileProvider = (props) => {
    const [userProfile, setUserProfile] = useState(userData)

    // Update Data while runing
    const updateData = useCallback(async () => {
        var { data } = await AxiosHelper.getData(`/profile`);
        if (data.status === true) {
            var newData = data.data
            setUserProfile((prevState) => ({ ...prevState, ...newData, access_token: localStorage.getItem('token') }))
        }
    }, [])

    useEffect(() => { userData.access_token && updateData() }, [updateData])

    const setData = (data) => setUserProfile({ ...userProfile, ...data })

    return (
        <userProfileData.Provider value={{ ...userProfile, updateData, setData }}>
            {props.children}
        </userProfileData.Provider>
    )
}

export default UserProfileProvider