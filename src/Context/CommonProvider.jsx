import React from 'react'
import UserProfileProvider from './UserProfileProvider'
import GeneralSettingsProvider from './GeneralSettingsProvider'
import CartProvider from './CartProvider'

const CommonProvider = (props) => {
    return (
        <GeneralSettingsProvider>
            <UserProfileProvider>
                <CartProvider>
                    {props.children}
                </CartProvider>
            </UserProfileProvider>
        </GeneralSettingsProvider>
    )
}

export default CommonProvider