import { useContext } from "react";
import { cartData } from '../Context/CartProvider'

const useCart = () => {
    return useContext(cartData);
}

export default useCart