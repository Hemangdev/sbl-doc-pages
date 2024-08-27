import { Fragment, useEffect } from "react"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import AxiosHelper from "../helper/AxiosHelper"
import useCart from "../Hooks/useCart"
import useSetting from "../Hooks/useSetting"
import { strLimit } from "../helper/StringHelper"
import MetaTags from "../Components/MetaTags"
const public_path = process.env.REACT_APP_PUBLIC_URL

const CartItems = () => {

    const [coupon, setCoupon] = useState('')
    const { changeCurrency } = useSetting()
    const ipCheck = false;
    const [show, setShow] = useState(false)
    const [coupinList, setCoupinList] = useState([])
    const { applyCoupon } = useCart()
    const { getCart, updateMyCart } = useCart()
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("coupons");
            if (data.status === true) {
                setCoupinList(data.data)
            }
        })();
        updateMyCart()
    }, [])

    const applyMyCoupon = () => {
        if (coupon === '') {
            toast.error("Please enter coupon code.")
            return false;
        }

        applyCoupon(coupon)
            .then(res => res && updateMyCart())
    }

    return (
        <>
            <MetaTags data={{ title: 'Cart' }} />
            <div className="container my-3">
                {getCart?.warning && <div className="alert alert-danger" role="alert">
                    {getCart?.warning}
                </div>}
                <div className="card">
                    <div className="card-header">
                        <div className="row justify-content-between">
                            <div className="col-md-auto">
                                <h5 className="mb-3 mb-md-0">Shopping Cart ( {getCart?.products?.length} Items)</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="row gx-card mx-0 bg-200 text-900 fs--1 fw-bold border-bottom">
                            <div className="col-md-6 py-2 px-3">Name</div>
                            <div className="col-md-6 flex-equal">
                                <div className="py-2 text-center">Quantity</div>
                                <div className="py-2 text-center">{ipCheck ? 'Tax' : null} </div>
                                <div className="py-2 text-center">{ipCheck ? 'Tax Amount' : null}</div>
                                <div className="py-2 text-center">{ipCheck ? null : 'Unit Price'}</div>
                                <div className="py-2 text-end">Price</div>
                            </div>
                        </div>
                        {getCart?.products?.map((item, i) => (
                            <CartItem item={item} myQty={item.quantity} key={i} />
                        ))}

                        {getCart?.products?.length === 0 && <div className="text-danger text-center my-2">No Product in Your Cart.</div>}

                        {getCart?.totals?.map((item, i) => (
                            <Fragment key={i}>
                                {(item?.value > 0) ?
                                    <div className="row fw-bold gx-card mx-0">
                                        <div className="col-9 py-1 text-end text-900">
                                            {item?.title}
                                        </div>
                                        <div className="col-3 px-2 ">
                                            <div className="text-end py-1 d-flex justify-content-between">
                                                {(item?.title === 'Discount' && getCart?.coupon?.coupon_code !== undefined) ?
                                                    <>
                                                        <span className="text-success d-none d-md-inline-block">{`{${getCart?.coupon?.coupon_code}}`} </span>
                                                        <i></i>
                                                    </> :
                                                    <i></i>
                                                }

                                                <>{changeCurrency(item?.value)}</>
                                            </div>
                                        </div>
                                    </div> : null
                                }
                            </Fragment>
                        ))}

                    </div>
                    <div className="card-footer bg-light">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-6">
                                <div className="row">
                                    <div className="col-sm-4 mb-1 coupon-list-button">
                                        <button disabled={getCart?.products?.length === 0} className="btn btn-sm w-100 btn-success" onClick={() => setShow(true)}>Check Coupon List</button>
                                    </div>
                                    <div className="col-sm-4 mb-1">
                                        <div className="input-group input-group-sm">
                                            <input className="form-control" type="text" placeholder="Promo Code" value={coupon} onChange={e => setCoupon(e.target.value)} />
                                            <button disabled={getCart?.products?.length === 0} className="btn btn-danger border-300 btn-sm" onClick={applyMyCoupon}>Apply</button>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mb-1">
                                        <Link className={`btn btn-sm w-100 btn-primary ${getCart?.products?.length === 0 ? 'disabled' : ''}`} to={`${public_path}/checkout`}>Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal scrollable centered show={show} onHide={() => setShow(false)} >
                <Modal.Header className="py-2" closeButton>
                    <Modal.Title>Coupon List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        {coupinList.map((item, i) => {
                            const isActiveCoupon = item?.code?.includes('SBLEMP');
                            return (
                                <div className="card my-1 border border-success rounded-3" key={i}>
                                    <div className="card-header bg-success text-white fs-6 d-flex justify-content-between align-items-center">
                                        <p className="fs-5 m-0">{item.name}</p>
                                        <b className="border-dotted">{item.code}</b>
                                    </div>
                                    <div className="card-body d-flex justify-content-between align-items-start py-2 gap-1">
                                        <div className="card-title">
                                            <h4>Discount: <b className="text-danger">{item.type === "Fixed" ? `${changeCurrency(item.discount)}` : `${item.discount}%`}</b></h4>
                                            {item.isexpire && <small className="text-danger small">(Expired)</small>}
                                            <p className="small mb-0 text-green">{strLimit(item.description, 120)}</p>
                                        </div>
                                        <button
                                            className={`btn btn-sm ${item.isexpire ? 'btn-danger' : 'btn-primary'}`}
                                            disabled={item.isexpire}
                                            onClick={() => {
                                                setCoupon(item.code);
                                                setShow(false);
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {coupinList.length === 0 ? <p className="text-danger">No Coupon Found. </p> : null}
                    </ul>
                </Modal.Body>
            </Modal >
        </>
    )
}


const CartItem = ({ item, myQty = 0 }) => {

    const [qty, setQty] = useState(myQty)
    const [isDisbaled, setIsDisbaled] = useState(false)
    const { changeCurrency } = useSetting()
    const ipCheck = false;
    const { updateCart, removeItemFromCart, updateMyCart } = useCart()

    useEffect(() => {
        setQty(myQty)
    }, [myQty])

    const handelQty = (e) => {
        console.log('item', item);
        if (item.stock || item?.attributes?.quantity >= 1 || item.is_membership === 1) {
            var updateQty = 0;
            if (e === '+') {
                qty < 10 && (updateQty = qty + 1)
            } else if (e === '-') {
                qty > 1 && (updateQty = qty - 1)
            } else {
                var val = parseInt(e.target.value);
                if (val >= 1 && val <= 10) updateQty = val
            }

            if (updateQty !== 0) {
                setIsDisbaled(true)
                updateCart(updateQty, item.cart_id).then(res => {
                    setIsDisbaled(false)
                    res ? (updateMyCart() && setQty(updateQty)) : setQty(item.quantity)
                })
            }
        } else {
            setQty(0)
        }
    }

    const removeItem = () => {
        removeItemFromCart(item.cart_id).then(res => res && updateMyCart())
    }

    return (
        <div className="row gx-card mx-0 bg-200 text-900 fs-7 border-bottom border-200">
            <div className="col-md-6 py-2">
                <div className="d-flex align-items-center">
                    <Link to={`${public_path}/product-details/${item?.slug}`}>
                        <img className="img-fluid rounded-1 me-3 d-none d-md-block" src={item?.image} alt="" width={60} />
                    </Link>
                    <div className="flex-1">
                        <h5>
                            <Link className="text-900 text-decoration-none text-dark fs-6 fw-normal" to={`${public_path}/product-details/${item?.slug}`}>{item?.name}  x {qty}</Link>
                        </h5>
                        <div className="w-100 d-flex">
                            {item?.attributes?.attr?.map((rows, key) => (
                                <small key={key} className="badge bg-success rounded-0 me-1 lh-base">{rows?.attribute_master_name} : <b>{rows?.attribute_name}</b> </small>
                            ))}
                            <span role="button" className="text-danger" onClick={removeItem}>Remove</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6  flex-equal">
                <div className="py-2 text-center">
                    <div className="input-group input-group-sm flex-nowrap" data-quantity="data-quantity">
                        <button disabled={isDisbaled} onClick={() => handelQty('-')} className="btn btn-sm btn-outline-secondary border-300 px-2" data-type="minus">-</button>
                        <input disabled={isDisbaled} onChange={handelQty} min={1} className="form-control text-center px-2 input-spin-none" type="number" value={qty} style={{ width: 50 }} />
                        <button disabled={isDisbaled} onClick={() => handelQty('+')} className="btn btn-sm btn-outline-secondary border-300 px-2" data-type="plus">+</button>
                    </div>
                </div>
                <div className="py-2 text-center">{ipCheck ? item?.tax_name : null}</div>
                <div className="py-2 text-center">{ipCheck ? changeCurrency(item?.total_tax) : null}</div>
                <div className="py-2 text-center">{ipCheck ? null : changeCurrency(item?.price)}</div>
                <div className="text-end py-2">{ipCheck ? changeCurrency(item?.total - item?.total_tax) : changeCurrency(item?.total)}</div>
            </div>
        </div>

    )
}


export default CartItems