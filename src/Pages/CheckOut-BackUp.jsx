import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import AxiosHelper from "../helper/AxiosHelper"
import { displayRazorpay } from "../helper/RazorpayHelper"
import useCart from "../Hooks/useCart"
import useProfile from "../Hooks/useProfile"
import useSetting from "../Hooks/useSetting"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../helper/LoaderHelper";

const public_path = process.env.REACT_APP_PUBLIC_URL

const CheckOut = () => {

    const { getCart, updateMyCart } = useCart()
    const { id } = useProfile()
    const { is_cod, changeCurrency } = useSetting();
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('online')
    const [addressList, setAddressList] = useState([])
    const [addSaved, setAddSaved] = useState(false)

    var iniData = {
        customer_name: "",
        customer_email: "",
        customer_mobile: "",
        shipping_address_1: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_state: "",
        shipping_country: "",
        shipping_postcode: "",
        user_comment: "",
        session_id: localStorage.getItem('session_id'),
    }

    const [initialValues, setInitialValues] = useState(iniData)


    const SignUpSchema = Yup.object().shape({

        customer_name: Yup.string().min(2).max(100).required("Please enter your name."),
        customer_email: [null, undefined].includes(id) ?
            Yup.string().min(2).max(100).email().required("Please enter your email.")
            :
            Yup.string().min(2).max(100).email(),
        customer_mobile: [null, undefined].includes(id) ?
            Yup.string().min(2).max(10).matches(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                "Please enter valid mobile number."
            ).required("Please enter your mobile/phone number.")
            :
            Yup.string().min(2).max(10).matches(
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        shipping_address_1: Yup.string().min(2).max(100).required("Please enter first address."),
        shipping_address_2: Yup.string().min(2).max(100).required("Please enter second address."),
        shipping_city: Yup.string().min(2).max(100).required("Please enter city."),
        shipping_state: Yup.string().min(2).max(100).required("Please enter state."),
        shipping_country: Yup.string().min(2).max(100).required("Please enter country."),
        shipping_postcode: Yup.string().min(2).max(10).required("Please enter postal code."),
        user_comment: Yup.string().nullable(),
    });

    useEffect(() => {
        if (id) {
            (async () => {
                var { data } = await AxiosHelper.postData(`address`);
                if (data.status === true) {
                    if (data.data.length > 0) {
                        setAddSaved(true)
                        var { id, name, address_1, address_2, city_name, state_name, country_name, postcode } = data.data?.[0]
                        setInitialValues(prevVal => ({
                            ...prevVal,
                            address_id: id,
                            customer_name: name,
                            shipping_address_1: address_1,
                            shipping_address_2: address_2,
                            shipping_city: city_name,
                            shipping_state: state_name,
                            shipping_country: country_name,
                            shipping_postcode: postcode
                        }))
                    }
                    setAddressList(data.data)
                }
            })();
        }
    }, [id]);


    // If already filled perviously...
    useEffect(() => {
        var address = localStorage.getItem('address')
        if (address) {
            var addData = JSON.parse(address)
            setAddSaved(true)
            setInitialValues(prevVal => ({ ...prevVal, ...addData }))
        }
    }, [])

    useEffect(() => {
        if (getCart?.products?.length === 0) {
            // toast.error("Please add some products in your cart first.");
            navigate(`${public_path}/product`)
        }
    }, [navigate, getCart])



    const addressChanged = (e) => {
        var address_id = parseInt(e.target.value)
        var data = addressList.filter(item => item.id === address_id)[0];
        setAddSaved(true)
        setInitialValues(prevVal => ({
            ...prevVal,
            customer_name: data?.name,
            shipping_address_1: data?.address_1,
            shipping_address_2: data?.address_2,
            shipping_city: data?.city_name,
            shipping_state: data?.state_name,
            shipping_country: data?.country_name,
            shipping_postcode: data?.postcode,
        }))
    }

    const submitOrder = async () => {
        if (!addSaved) {
            return toast.error('Please provide Address first.')
        }
        else if (paymentMethod === 'cod') {
            showLoader()
            var { data } = await AxiosHelper.postData(`create_order_cod`, initialValues);
            if (data.status === true) {
                updateMyCart()
                toast.success(data.message)
                hideLoader()
                localStorage.removeItem('session_id')
                localStorage.removeItem('address')
                return navigate(`${public_path}/my-orders`)
            }
            else {
                toast.error(data.message)
                return navigate(`${public_path}/my-orders`)
            }
        }
        else if (paymentMethod === 'online') {
            displayRazorpay(initialValues)
        }
        else {
            return toast.error("Oops..!  There is some error.")
        }
    }

    return (
        <div className="container my-4">
            {getCart?.warning && <div className="alert alert-danger" role="alert">
                {getCart?.warning}
            </div>}
            <div className="row g-3">
                <div className="col-xl-4 order-xl-1">
                    <div className="card">
                        <div className="card-header bg-light btn-reveal-trigger d-flex justify-content-between">
                            <h5 className="mb-0">Order Summary</h5>
                            <Link className="btn btn-link btn-sm text-primary text-600" to={`${public_path}/cart`}>
                                <span className="fas fa-pencil-alt" />
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-borderless fs--1 mb-0">
                                <tbody>
                                    {getCart?.products?.map((item, i) => (
                                        <tr className="border-bottom" key={i}>
                                            <td className="ps-0 pt-0 fs-6">{item.name} ( {item.model} ) x {item.quantity}
                                                <small className="text-400 fw-normal d-block">
                                                    {item?.attributes?.attr?.map((rows, key) => (
                                                        <small key={key} className="pe-2 badge bg-success rounded-0 me-1">{rows?.attribute_master_name} : <b>{rows?.attribute_name}</b> </small>
                                                    ))}
                                                </small>
                                            </td>
                                            <th className="pe-0 text-end pt-0">{changeCurrency(item?.total)}</th>
                                        </tr>
                                    ))}

                                    {getCart?.totals?.map((item, i) => (
                                        <tr className="fw-bold position-relative" key={i}>
                                            <td className="p-1 ps-0">
                                                {item?.title}
                                                {(item?.title === 'Discount' && getCart?.coupon?.coupon_code !== undefined) ?
                                                    <i className="text-success ms-2">{`{ ${getCart?.coupon?.coupon_code} }`}</i> : ""}
                                            </td>
                                            <td className="p-1 pe-0 text-end">{changeCurrency(item?.value)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer d-flex justify-content-between bg-light">
                            <div className="fw-semi-bold">Payable Total</div>
                            <div className="fw-bold">{changeCurrency(getCart?.cart_total)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">

                    <div className="card mb-3">

                        <div className="card-header bg-light">
                            <div className="row d-flex justify-content-between">
                                <div className="col-sm-auto">
                                    <h5 className="mb-2 mb-sm-0">Your Shipping Address </h5>
                                </div>
                                <div className="col-sm-auto">
                                    {id && <Link className="btn btn-falcon-default btn-sm" to={`${public_path}/my-addresses`}>
                                        <span className="fas fa-plus me-2" />
                                    </Link>}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row" onChange={addressChanged}>
                                {addressList.map((item, i) => (
                                    <div className="col-md-6 mb-3 mb-md-0" key={i}>
                                        <div className="bg-white card addresses-item mb-4 border shadow border-primary p-2">
                                            <div className="form-check mb-0 custom-radio radio-select">
                                                <input className="form-check-input" name="address_id" id={`address-${item.id}`} type="radio" value={item.id} defaultChecked={initialValues.address_id === item.id} />
                                                <label className="form-check-label mb-0 fw-normal d-block" htmlFor={`address-${item.id}`}>
                                                    <span className="radio-select-content">
                                                        {`${item.name}, ${item.address_1}, ${item?.city_name}, ${item?.state_name}, ${item?.country_name}, ${item?.postcode}`}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                {addressList.length === 0 &&
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={SignUpSchema}
                                        enableReinitialize
                                        onSubmit={(values, { resetForm }) => {
                                            localStorage.setItem('address', JSON.stringify(values))
                                            setInitialValues(prevVal => ({ ...prevVal, ...values }));
                                            toast.success('Address Saved Successfully')
                                            setAddSaved(true);
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="col-md-12 px-3">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">Your Name</label>
                                                            <Field type="text" name="customer_name" className="form-control" placeholder="Your Name" />
                                                            <small className="text-danger">{errors?.customer_name}</small>
                                                        </div>
                                                    </Col>
                                                    {(id === null || id === undefined) && <>
                                                        <Col md="6">
                                                            <div className="mb-2">
                                                                <label className="form-label fs-7">Email</label>
                                                                <Field type="text" name="customer_email" className="form-control" placeholder="Email" />
                                                                <small className="text-danger">{errors?.customer_email}</small>
                                                            </div>
                                                        </Col>
                                                        <Col md="6">
                                                            <div className="mb-2">
                                                                <label className="form-label fs-7">Mobile / Phone</label>
                                                                <Field type="text" name="customer_mobile" className="form-control" placeholder="Mobile / Phone" />
                                                                <small className="text-danger">{errors?.customer_mobile}</small>
                                                            </div>
                                                        </Col>
                                                    </>}
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">First Address</label>
                                                            <Field type="text" name="shipping_address_1" className="form-control" placeholder="First Address" />
                                                            <small className="text-danger">{errors?.shipping_address_1}</small>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">Second Address</label>
                                                            <Field type="text" name="shipping_address_2" className="form-control" placeholder="Second Address" />
                                                            <small className="text-danger">{errors?.shipping_address_2}</small>
                                                        </div>
                                                    </Col>

                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">City</label>
                                                            <Field type="text" name="shipping_city" className="form-control" placeholder="City" />
                                                            <small className="text-danger">{errors?.shipping_city}</small>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">State</label>
                                                            <Field type="text" name="shipping_state" className="form-control" placeholder="State" />
                                                            <small className="text-danger">{errors?.shipping_state}</small>
                                                        </div>
                                                    </Col>
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label fs-7">Country</label>
                                                            <Field type="text" name="shipping_country" className="form-control" placeholder="Country" />
                                                            <small className="text-danger">{errors?.shipping_country}</small>
                                                        </div>
                                                    </Col>

                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label  fs-7">Postal Code</label>
                                                            <Field type="text" name="shipping_postcode" className="form-control" placeholder="Postal Code" />
                                                            <small className="text-danger">{errors?.shipping_postcode}</small>
                                                        </div>
                                                    </Col>
                                                    <Col md="6" className="sbt-btn p-2">
                                                        <br />
                                                        <Button className="submitbtn px-3" variant="primary" type="submit">Save Address</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                }

                                <Col md="12" className="mt-2">
                                    <div className="mb-2">
                                        <label className="form-label  fs-7">Your Instruction</label>
                                        <input type='textarea' onChange={(e) => setInitialValues(prevVal => ({ ...prevVal, user_comment: e.target.value }))} value={initialValues.user_comment} name="user_comment" className="form-control" placeholder="Your Instruction" />
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Payment Method</h5>
                        </div>
                        <div className="card-body">
                            <div onChange={(e) => setPaymentMethod(e.target.value)}>
                                <div className="form-check mb-0" >
                                    <input className="form-check-input" type="radio" id="online" value="online" defaultChecked="checked" name="payment-method" />
                                    <label className="form-check-label mb-2 fs-6" htmlFor="online">Online Payment</label>
                                </div>
                                {parseInt(is_cod) === 1 && <div className="form-check d-flex align-items-center">
                                    <input className="form-check-input" type="radio" id="cod" value="cod" name="payment-method" />
                                    <label className="form-check-label mb-0 ms-2" htmlFor="cod">Cash on Delivery</label>
                                </div>}
                            </div>
                            <div className="row">
                                <div className="col-md-5 col-xl-12 col-xxl-5 ps-lg-4 ps-xl-2 ps-xxl-5 text-center text-md-start text-xl-center text-xxl-start">
                                    <div className="border-dashed-bottom d-block d-md-none d-xl-block d-xxl-none my-4" />
                                    <div className="fs-2 fw-semi-bold">All Total: <span className="text-primary">{changeCurrency(getCart?.cart_total)}</span>
                                    </div>
                                    <button onClick={getCart?.warning === '' ? submitOrder : undefined} className="btn btn-success mt-3 px-5" type="submit" disabled={getCart?.warning !== ''}>Confirm &amp; Pay</button>
                                    <p className="fs--1 mt-3 mb-0">By clicking <strong>Confirm &amp; Pay </strong>button you agree to the <Link to={`${public_path}/terms-conditions`}>Terms &amp; Conditions</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default CheckOut
