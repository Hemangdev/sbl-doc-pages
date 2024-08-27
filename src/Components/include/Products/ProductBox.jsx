import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { strLimit } from "../../../helper/StringHelper"
import useCart from "../../../Hooks/useCart"
import useSetting from "../../../Hooks/useSetting"
const public_path = process.env.REACT_APP_PUBLIC_URL

const ProductBox = ({ item }) => {
    const navigation = useNavigate()
    const { addToCart, updateMyCart } = useCart()
    const { changeCurrency } = useSetting()
    const buyNow = () => {
        if (item.attributes.length > 0) {
            toast.info("Please select variont first.");
            navigation(`${public_path}/product-details/${item?.slug}`)
        }
        else {
            addToCart(item.id)
                .then(res => {
                    if (res) {
                        updateMyCart()
                        navigation(`${public_path}/cart`)
                    }
                })
        }
    }

    return (
        <div className="card product">
            <Link to={`${public_path}/product-details/${item?.slug}`}>
                <img src={item?.image} className="card-img" alt="" />
            </Link>
            <h6 className="card-title">
                <Link className="text-decoration-none text-dark" to={`${public_path}/product-details/${item?.slug}`}>{strLimit(item?.name, 50)}</Link>
            </h6>
            <div className="card-body">
                <div className="price-data">
                    {
                        item?.mrp != item?.price ? <>
                            <b> {changeCurrency(item?.price)}</b>
                            {item?.price < item?.mrp && <small className="text-muted small">MRP: <del> {changeCurrency(item?.mrp)}</del></small>}
                            {item?.price < item?.mrp &&
                                <small className="text-success mt-auto">
                                    You save : {changeCurrency(item?.mrp - item?.price)}
                                    ({Math.round(((item?.mrp - item?.price) / item?.mrp) * 100)}%)*
                                </small>}
                        </> : <h4> {changeCurrency(item?.mrp)}</h4>
                    }
                </div>
                <button className="btn btn-buy" onClick={buyNow}>BUY NOW</button>
            </div>
        </div>
    )
}

export default ProductBox