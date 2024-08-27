import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { compairArray } from "../../../helper/StringHelper";
import useCart from "../../../Hooks/useCart";
import useSetting from "../../../Hooks/useSetting"
const public_path = process.env.REACT_APP_PUBLIC_URL

const ProductCategoryItem = ({ data }) => {

    const qty = 1
    const { addToCart, updateMyCart } = useCart();
    const { changeCurrency } = useSetting()
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled] = useState(false)
    const [price, setPrice] = useState(0)
    const [attr, setAttr] = useState({})
    const [specialPrice, setSpecialPrice] = useState(0)
    const [mrp, setMrp] = useState(0)

    useEffect(() => {
        data?.variants?.forEach((item, i) => {
            item?.attribute?.forEach((row, j) => {
                j === 0 && setAttr(prev => ({ ...prev, [item?.attr_id]: row?.id }));
            })
        })

    }, [data]);

    useEffect(() => {
        if (data?.variants.length === 0) {
            setMrp(data?.mrp);
            setSpecialPrice(data?.price);
            setPrice(`${changeCurrency(data?.price)}`) //data?.mrp > 0 ? data?.mrp : data?.price
        } else if (data?.variants?.length > 0) {
            var selected = data?.variants_attributes.filter(item => {
                var arr = []
                Object.keys(attr).forEach(key => arr.push(attr[key].toString()));
                return compairArray(arr, item.attribute_id.split(',')) && item;
            })[0]

            if (selected === undefined) {
                setIsDisabled(true)
                setSpecialPrice(0);
                setPrice(`<small class='text-danger'>Variant not available.</small>`)
            }
            else {
                setIsDisabled(false)
                setMrp(selected?.mrp)
                setSpecialPrice(selected?.price);
                setPrice(`${changeCurrency(selected.price)}`)
            }
        }
    }, [attr, changeCurrency, data])


    const changeAttr = (attr_id, id) => {
        setAttr(prev => ({ ...prev, [attr_id]: id }))
    }

    const buyNow = (id) => {
        addToCart(id, qty, JSON.stringify(attr))
        navigate(`${public_path}/cart`)
    }

    const addToCartIni = (id, qty) => {
        addToCart(id, qty, JSON.stringify(attr)).then(res => res && updateMyCart())
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="w-100 text-center">
                    <div className="my-product-image">
                        <img src={data.image} alt={data.name} />
                    </div>
                </div>
            </div>

            <div className="col-md-6 p-4 product_detaild-flex d-flex flex-column gap-2" style={{ minHeight: 350 }}>
                <h2><Link className="heading text-decoration-none" to={`${public_path}/product-details/${data?.slug}`}>{data.name}</Link></h2>
                <h5>Price : <span dangerouslySetInnerHTML={{ __html: price }} /> { specialPrice < mrp && <span style={specialPrice != mrp ? { textDecoration: 'line-through', fontSize: '14px'}: {textDecoration: 'default'} } dangerouslySetInnerHTML={{ __html: mrp }} />}</h5>
                {data?.variants?.map((item, i) => (
                    <div className='my-1' key={i}>
                        <h6 className='py-2'> {item?.attr_name} : </h6>
                        <div className="d-flex flex-wrap gap-2 mb-2">
                            {item?.attribute?.map((row, j) => (
                                <div className="form-check-radio" key={j}>
                                    <input className="form-check-input d-none" type="radio" value={row.id} onChange={() => changeAttr(item?.attr_id, row?.id)} checked={attr[item?.attr_id] === row?.id} name={item?.attr_id} id={`${i}_${j}`} />
                                    <label className={`btn btn-sm rounded-0 btn-outline-success`} htmlFor={`${i}_${j}`}>
                                        {row?.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}


                <div className="my-2 position-absolute" style={{ bottom: 10 }}>
                    <button className="btn btn-link underline text-primary" onClick={() => !isDisabled && addToCartIni(data.id, qty)} disabled={isDisabled}>ADD TO CART</button>
                    <button className="btn btn-link underline text-success" onClick={() => !isDisabled && buyNow(data.id, qty)} disabled={isDisabled}>BUY NOW</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryItem;