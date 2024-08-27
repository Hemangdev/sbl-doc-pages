import { createContext } from "react";
import { toast } from "react-toastify";
import { makeid } from "../helper/StringHelper";
import AxiosHelper from '../helper/AxiosHelper'
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";

var session_id = localStorage.getItem('session_id');

const getSessionId = () => {
    session_id = localStorage.getItem('session_id');
}

const addToCart = async (product_id, quantity = 1, attributes = '') => {
    getSessionId()

    if (!session_id) {
        session_id = makeid(30)
        localStorage.setItem('session_id', session_id);
    }

    var { data } = await AxiosHelper.postData(`/addtocart`, { product_id, quantity, session_id, attributes });
    if (data.status === true) {
        toast.success('Product added to cart successfully.')
        return true;
    }

    toast.error(data.message)
    return false;
}

const updateCart = async (quantity, cart_id) => {
    var { data } = await AxiosHelper.postData(`/updatecartitem`, { quantity, cart_id, session_id });
    if (data.status === true) {
        return true;
    }

    toast.error(data.message)
    return false;
}

const removeItemFromCart = async (cart_id) => {
    var { data } = await AxiosHelper.postData(`/removecart`, { cart_id, session_id });
    if (data.status === true) {
        return true;
    }

    toast.error(data.message)
    return false;
}

const applyCoupon = async (coupon) => {
    var { data } = await AxiosHelper.postData("/checkcoupon", { coupon, session_id });
    if (data.status === true) {
        toast.success(data?.message)
        return true;
    } else {
        toast.error(data?.message)
        return false;
    }
}

const userData = { addToCart, updateCart, removeItemFromCart, applyCoupon }

const CartProvider = (props) => {
    const [getCart, setGetCart] = useState({
        warning: "",
        products: [],
        totals: [],
        cart_total: 0
    })

    const getCartData = useCallback(() => {
        (async () => {
            if (session_id) {
                var { data } = await AxiosHelper.postData(`/getcart`, { session_id });
                if (data.success === true) {
                    setGetCart(data.data);
                }
            }
            return false;
        })()
    }, [])


    useEffect(() => {
        getCartData()
    }, [getCartData])

    const updateMyCart = () => {
        getCartData()
    }

    return (
        <cartData.Provider value={{ ...userData, getCart, updateMyCart }}>
            {props.children}
        </cartData.Provider>
    )
}

export const cartData = createContext(userData)
export default CartProvider