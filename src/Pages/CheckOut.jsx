import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom"
import AxiosHelper from "../helper/AxiosHelper"
import { displayRazorpay } from "../helper/RazorpayHelper"
import useCart from "../Hooks/useCart"
import useProfile from "../Hooks/useProfile"
import useSetting from "../Hooks/useSetting"
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../helper/LoaderHelper";
import AddressForm from "../Components/AddressForm";
import { useCallback } from "react";
const public_path = process.env.REACT_APP_PUBLIC_URL

const CheckOut = () => {

    const { getCart, updateMyCart } = useCart()
    const { id, name, email, mobile } = useProfile()
    const { is_cod, changeCurrency, shipping_charges, min_order_value_shipping_charges, international_shipping_charges } = useSetting();
    const [shippingCharge, setShippingCharge] = useState(0)
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [countries, setCountries] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])
    const [paymentMethod, setpaymentMethod] = useState('online')
    const [addressList, setaddressList] = useState([])
    const [addSaved, setAddSaved] = useState(false)
    const [otpSend, setOtpSend] = useState('');
    const [otpError, setOtpError] = useState('');
    const [verified, setVerified] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [message, setMessage] = useState(false)
    const isSblEmployee = getCart?.coupon?.coupon_code?.includes("SBLEMP")

    const [values, setValues] = useState({
        customer_name: "",
        customer_email: email,
        customer_mobile: "",
        country_code: "+91",
        shipping_address_1: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_state: "",
        shipping_country: "",
        shipping_postcode: "",
        user_comment: "",
        country_id: null,
        state_id: null,
        session_id: localStorage.getItem('session_id'),
    })

    let subTotal = getCart.totals.find(item => item.title === "Sub-Total")
    // If already filled perviously...
    useEffect(() => {
        (async () => {
            var address = localStorage.getItem('address')
            if (address) {
                setError({})
                var addData = JSON.parse(address)
                setAddSaved(true)
                setValues(prevVal => ({ ...prevVal, ...addData }))
                if (addData?.country_id !== undefined) {
                    let { data } = await AxiosHelper.getData(`getstate/${addData.country_id}`);
                    if (data.status === true) { setState(data.data) }
                }

                if (addData?.state_id !== undefined) {
                    var { data } = await AxiosHelper.getData(`getcity/${addData?.state_id}`);
                    if (data.status === true) { setCity(data.data) }
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (getCart?.products?.length === 0) {
            // toast.error("Please add some products in your cart first.");
            navigate(`${public_path}/product`)
        }

        if (id && (!name || !email || !mobile)) {
            toast.error("Please complete your profile first.");
            navigate(`${public_path}/update-profile`)
        }

    }, [navigate, email, name, mobile, id, getCart])

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`getcountry`);
            if (data.status === true) {
                setCountries(data.data)
            } else {
                toast.error(data.message);
            }
        })();
    }, []);

    useEffect(() => {
        setValues({ ...values, session_id: localStorage.getItem('session_id') })
    }, [localStorage.getItem('session_id')]);

    useEffect(() => {
        if (values.shipping_country) {
            if (values?.shipping_country?.toLowerCase() === 'india') {
                if (parseFloat(getCart?.cart_total) <= parseFloat(min_order_value_shipping_charges)) {
                    setShippingCharge(parseFloat(shipping_charges))
                }
                else { setShippingCharge(0) }
            } else { setShippingCharge(parseFloat(international_shipping_charges)) }
        }
    }, [values.shipping_country, getCart?.cart_total, shipping_charges, min_order_value_shipping_charges, international_shipping_charges])

    const addressChanged = (e) => {
        var address_id = parseInt(e.target.value)
        var data = addressList.filter(item => item.id === address_id)[0];
        setAddSaved(true)
        setValues(prevVal => ({
            ...prevVal,
            customer_name: data?.name,
            shipping_address_1: data?.address_1,
            shipping_address_2: data?.address_2,
            shipping_city: data?.city_name,
            shipping_state: data?.state_name,
            shipping_country: data?.country_name,
            shipping_postcode: data?.postcode
        }))
    }

    const submitOrder = async () => {
        if (!addSaved) {
            return toast.error('Please provide Address first.')
        }
        else if (paymentMethod === 'cod') {
            values.customer_mobile = values.customer_mobile?.toString()
            showLoader()
            var { data } = await AxiosHelper.postData(`create_order_cod`, values);
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
                setErrorMsg(data.message)
                hideLoader()
                //return navigate(`${public_path}/my-orders`)
            }
        }
        else if (paymentMethod === 'online') {
            values.customer_mobile = values.customer_mobile?.toString()
            displayRazorpay(values)
        }
        else {
            return toast.error("Oops..!  There is some error.")
        }
    }

    const handelChange = (e) => {
        var { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const SignupSchema = Yup.object().shape({
        customer_name: Yup.string().min(2).max(100).required("Please enter customer name."),
        customer_email: Yup.string().min(2).email().max(100).required("Please enter customer email."),
        customer_mobile: Yup.string().typeError("Please enter mobile number.").min(10, 'Mobile must be at least 10 characters').max(10, 'Mobile must be at most 10 characters').required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
        shipping_address_1: Yup.string().min(2).max(100).required("Please enter Address Line 1."),
        shipping_address_2: Yup.string().min(2).max(100).required("Please enter Address Line 2."),
        shipping_country: Yup.string().typeError("Please select country.").min(1, "Please select country.").max(200).required("Please select country."),
        shipping_state: Yup.string().typeError("Please select state.").min(1, "Please select state.").max(200).required("Please select state."),
        shipping_city: Yup.string().typeError("Please select city.").min(1, "Please select city.").max(200).required("Please select city."),
        shipping_postcode: Yup.string().min(2).max(12).required("Please enter postal code."),
    });

    const getData = useCallback(async () => {
        if (id) {
            (async () => {
                var { data } = await AxiosHelper.postData(`address`);
                if (data.status === true) {
                    if (data.data.length > 0) {
                        setAddSaved(true)
                        var { id, name, address_1, address_2, country_id, state_id, city_name, state_name, country_name, postcode, mobile } = data.data?.[0]
                        setValues(prev => ({
                            ...prev,
                            address_id: id,
                            country_id,
                            state_id,
                            customer_name: name,
                            shipping_address_1: isSblEmployee ? 'SBL House, 2, Commercial complex, Shrestha Vihar Shrestha Vihar' : address_1,
                            shipping_address_2: isSblEmployee ? 'SBL House, 2, Commercial complex, Shrestha Vihar Shrestha Vihar' : address_2,
                            shipping_city: isSblEmployee ? 'East Delhi' : city_name,
                            shipping_state: isSblEmployee ? 'Delhi' : state_name,
                            shipping_country: isSblEmployee ? 'India' : country_name,
                            shipping_postcode: isSblEmployee ? '110092' : postcode,
                            customer_mobile: mobile
                        }))
                    }
                    setaddressList(data.data)
                }
            })();
        }
    }, [id])

    useEffect(() => {
        getData();
    }, [getData]);

    const sendOTP = async (values) => {
        setOtpError('')
        let { data } = await AxiosHelper.postData("send_otp", {
            mobile: values.customer_mobile,
            country_code: "+91",
        });
        if (data.status === true) {
            setOtpSend(values.customer_mobile)
            hideLoader()
            toast.success(data.message);
        }
        else {
            hideLoader()
            setOtpError(data?.error?.mobile[0] || data.message)
        }
    }

    const verifyOTP = async ({ otp }) => {
        let { data } = await AxiosHelper.postData("verify_otp", {
            mobile: otpSend,
            country_code: "+91",
            otp: otp,
        });
        if (data.status === true) {
            setOtpSend('')
            setVerified(true)
            hideLoader()
            toast.success(data.message || 'Verified successfully');
        }
        else {
            setVerified(false)
            hideLoader()
            toast.error(data.message);
        }
    }

    const cartTotal = () => {
        return changeCurrency(Math.round(getCart?.cart_total + (paymentMethod === 'cod' ? 50 : 0)))
    }

    const disabledCOD = () => {
        subTotal = getCart.totals.find(item => item.title === "Sub-Total")
        if (subTotal?.value < 499) return true
        if (getCart?.products?.some(product => (product.product_id == 2842 || product.product_id == 2843))) return true
        if (!id && !verified) return true

        return false
    }

    useEffect(() => {
        const isMembership = id ? true : getCart?.products?.some((item) => item.is_membership === 1);

        if (id) {
            setVerified(true);
        }

        if (isMembership && (getCart?.warning !== '' || id && verified)) {
            setDisabled(true);
        } else if (!isMembership && (getCart?.warning !== '' || !id && verified)) {
            setDisabled(true);
        } else {
            setDisabled(false);
            if (isMembership && !id) {
                setMessage(true);
            }
        }
    }, [getCart?.warning, id, verified]);

    useEffect(() => {
        const initialValues = {
            customer_name: "",
            customer_email: "",
            customer_mobile: "",
            country_code: "+91",
            shipping_address_1: "SBL House, 2, Commercial complex, Shrestha Vihar Shrestha Vihar",
            shipping_address_2: "SBL House, 2, Commercial complex, Shrestha Vihar Shrestha Vihar",
            shipping_city: "East Delhi",
            shipping_state: "Delhi",
            shipping_country: "India",
            shipping_postcode: "110092",
            user_comment: "",
            country_id: 99,
            state_id: 1483,
            session_id: localStorage.getItem('session_id'),
        };

        if (isSblEmployee) {
            setValues(initialValues);
        }
    }, [isSblEmployee]);

    return (
        <>
            <div className="container my-4">
                {getCart?.warning && <div className="alert alert-danger" role="alert">
                    {getCart?.warning}
                </div>}
                {message && <div className="alert alert-danger" role="alert">
                    To proceed with purchasing the SBL care plan, kindly log in to your account.
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
                                                <td className="ps-0 pt-0 fs-6">{item.name} x {item.quantity}
                                                    <small className="text-400 fw-normal d-block">
                                                        {item?.attributes?.attr?.map((rows, key) => (
                                                            <small key={key} className="pe-2 badge bg-success rounded-0 me-1">{rows?.attribute_master_name} : <b>{rows?.attribute_name}</b> </small>
                                                        ))}
                                                    </small>
                                                </td>
                                                {/* <th className="pe-0 text-end pt-0">{ipCheck ? changeCurrency(item?.total - item?.total_tax) : changeCurrency(item?.total)}</th> */}

                                                <th className="pe-0 text-end pt-0">{changeCurrency(item?.total - item?.total_tax)}
                                                    <p style={{ fontSize: "80%", fontWeight: "700" }}>tax :  {changeCurrency(item?.total_tax)}</p>
                                                </th>
                                            </tr>

                                        ))}

                                        {
                                            getCart?.totals?.map((item, i) => (
                                                <Fragment key={i}>
                                                    {(item?.value > 0 && (paymentMethod === 'cod' ? item?.title !== 'Total' : true)) ?
                                                        <tr className="fw-bold position-relative">
                                                            <td className="p-1 ps-0">
                                                                {item?.title}
                                                                {(item?.title === 'Discount' && getCart?.coupon?.coupon_code !== undefined) ?
                                                                    <i className="text-success ms-2">{`{ ${getCart?.coupon?.coupon_code} }`}</i> : ""}
                                                            </td>
                                                            <td className="p-1 pe-0 text-end">{changeCurrency(item?.value)}</td>
                                                        </tr> : null
                                                    }
                                                    {(item?.value > 0 && paymentMethod === 'cod' && item?.title === 'Total') ?
                                                        <>
                                                            <tr className="fw-bold position-relative">
                                                                <td className="p-1 ps-0">COD Charges</td>
                                                                <td className="p-1 pe-0 text-end">{changeCurrency(50)}</td>
                                                            </tr>
                                                            <tr className="fw-bold position-relative">
                                                                <td className="p-1 ps-0">{item?.title}</td>
                                                                <td className="p-1 pe-0 text-end">{cartTotal()}</td>
                                                            </tr>
                                                        </> : null
                                                    }

                                                    {/* {(i === 2) ? <tr className="fw-bold">
                                                    <td className="p-1 ps-0"> Shipping Charge</td>
                                                    <td className="p-1 pe-0 text-end">{changeCurrency(shippingCharge)}</td>
                                                </tr> : null } */
                                                    }
                                                </Fragment>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer d-flex justify-content-between bg-light">
                                <div className="fw-semi-bold">Payable Total</div>
                                <div className="fw-bold">{cartTotal()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-3">
                            <div className="card-header bg-light">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-sm-auto">
                                        <h5 className="mb-2 mb-sm-0">Your Shipping Address</h5>
                                    </div>
                                    {!isSblEmployee &&
                                        <div className="col-sm-auto">
                                            {id && <Link className="btn btn-falcon-default btn-sm" to={`${public_path}/my-addresses`}>
                                                <span className="fas fa-plus me-2" />
                                            </Link>}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="card-body">
                                {!isSblEmployee &&
                                    <div className="row" onChange={addressChanged}>
                                        {addressList.map((item, i) => (
                                            <div className="col-md-6 mb-3 mb-md-0" key={i}>
                                                <div className="bg-white card addresses-item mb-4 border shadow border-primary p-2">
                                                    <div className="form-check mb-0 custom-radio radio-select">
                                                        <input className="form-check-input" name="address_id" id={`address-${item.id}`} type="radio" value={item.id} defaultChecked={values.address_id === item.id} />
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
                                }
                                <Row>
                                    {(id === null || isSblEmployee) &&
                                        <div className="col-md-12">
                                            <Formik
                                                initialValues={values}
                                                validationSchema={SignupSchema}
                                                enableReinitialize
                                                onSubmit={async (values, { resetForm }) => {
                                                    if (!id) {
                                                        sendOTP(values)
                                                        setVerified(false)
                                                    }

                                                    if (values.shipping_country.toLowerCase() === 'india' && values.shipping_postcode) {
                                                        var { data } = await AxiosHelper.postData(`/checkdelivery`, { postcode: values.shipping_postcode });
                                                        if (data.status === false) {
                                                            return setError({ shipping_postcode: "We can't deliver at this pin code." })
                                                        }
                                                    }

                                                    localStorage.setItem('address', JSON.stringify(values))
                                                    setValues(prevVal => ({ ...prevVal, ...values }))
                                                    toast.success('Address Saved Successfully')
                                                    setAddSaved(true);
                                                }}
                                            >
                                                {({ errors, touched, setFieldValue }) => (
                                                    <Form className="col-md-12 px-3">
                                                        <Row>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Customer Name <span className="text-danger">*</span></label>
                                                                    <Field type="text" name="customer_name" className="form-control" placeholder="Customer Name" />
                                                                    <small className="text-danger">{error?.customer_name ? error?.customer_name : <ErrorMessage name="customer_name" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Customer Email <span className="text-danger">*</span></label>
                                                                    <Field type="text" name="customer_email" className="form-control" placeholder="Customer Email" />
                                                                    <small className="text-danger">{error?.customer_email ? error?.customer_email : <ErrorMessage name="customer_email" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Customer Mobile <span className="text-danger">*</span></label>
                                                                    <Field type="number" name="customer_mobile" className="form-control" placeholder="Customer Mobile" />
                                                                    <small className="text-danger">{error?.customer_mobile ? error?.customer_mobile : <ErrorMessage name="customer_mobile" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Address Line 1 <span className="text-danger">*</span></label>
                                                                    <Field type="text" name="shipping_address_1" className="form-control" placeholder="Address Line 1" readOnly={isSblEmployee} />
                                                                    <small className="text-danger">{error?.shipping_address_1 ? error?.shipping_address_1 : <ErrorMessage name="shipping_address_1" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Address Line 2 <span className="text-danger">*</span></label>
                                                                    <Field type="text" name="shipping_address_2" className="form-control" placeholder="Address Line 2" readOnly={isSblEmployee} />
                                                                    <small className="text-danger">{error?.shipping_address_2 ? error?.shipping_address_2 : <ErrorMessage name="shipping_address_2" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">Country <span className="text-danger">*</span></label>
                                                                    <Field name="shipping_country" label="Country" options={countries} component={Select2} isDisabled={isSblEmployee}
                                                                        onChangeCustom={async (value) => {
                                                                            if (value?.id !== undefined) {
                                                                                setFieldValue('shipping_state', '')
                                                                                setFieldValue('shipping_city', '')
                                                                                setFieldValue('country_id', value.id)
                                                                                var { data } = await AxiosHelper.getData(`getstate/${value.id}`);
                                                                                console.log('data', data);
                                                                                if (data.status === true) {
                                                                                    setState(data.data)
                                                                                }
                                                                                else {
                                                                                    toast.error(data.message);
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                    <small className="text-danger">{error?.shipping_country ? error?.shipping_country : <ErrorMessage name="shipping_country" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">State <span className="text-danger">*</span></label>
                                                                    <Field name="shipping_state" label="State" options={state} component={Select2} isDisabled={isSblEmployee}
                                                                        onChangeCustom={async (value) => {
                                                                            if (value?.id !== undefined) {
                                                                                setFieldValue('state_id', value.id)
                                                                                var { data } = await AxiosHelper.getData(`getcity/${value.id}`);
                                                                                if (data.status === true) {
                                                                                    setCity(data.data)
                                                                                }
                                                                                else {
                                                                                    toast.error(data.message);
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                    <small className="text-danger">{error?.shipping_state ? error?.shipping_state : <ErrorMessage name="shipping_state" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label fs-7">City <span className="text-danger">*</span></label>
                                                                    <Field label="City" name="shipping_city" options={city} component={Select2} isDisabled={isSblEmployee} />
                                                                    <small className="text-danger">{error?.shipping_city ? error?.shipping_city : <ErrorMessage name="shipping_city" />}</small>
                                                                </div>
                                                            </Col>
                                                            <Col md="6">
                                                                <div className="mb-2">
                                                                    <label className="form-label  fs-7">Postal Code <span className="text-danger">*</span></label>
                                                                    <Field type="text" name="shipping_postcode" className="form-control" placeholder="Postal Code" readOnly={isSblEmployee} />
                                                                    <small className="text-danger">{error?.shipping_postcode ? error?.shipping_postcode : <ErrorMessage name="shipping_postcode" />}</small>
                                                                </div>
                                                            </Col>
                                                            {!isSblEmployee &&
                                                                <Col md="12" className="">
                                                                    <Button className="submitbtn" variant="primary" type="submit"> Update </Button>
                                                                </Col>
                                                            }
                                                            <Col md="12" className="mt-2">
                                                                {otpError && <small className="text-danger">{otpError}</small>}
                                                            </Col>

                                                        </Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    }

                                    {(id && addressList.length === 0) && <div className="col-md-12"> <AddressForm afterAdd={getData} /> </div>
                                    }
                                </Row>

                                <Row>
                                    <Col md="12" className="mt-2">
                                        <div className="mb-2">
                                            <label className="form-label  fs-7">Your Instruction</label>
                                            <input type="text" name="user_comment" className="form-control" onChange={handelChange} value={values.user_comment} minLength={1} maxLength={100} placeholder="Your Instruction" />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        {/* <div className="card mb-3">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Care plan</h5>
                        </div>
                        <div className="card-body">
                                asdfasdf
                        </div>
                    </div> */}
                        {otpSend &&
                            <div className={`card mb-3`}>
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Verify OTP</h5>
                                </div>
                                <div className="card-body">

                                    <Formik
                                        initialValues={{ otp: "" }}
                                        validationSchema={Yup.object().shape({ otp: Yup.number().required("Please enter OTP."), })}
                                        onSubmit={(values, { setErrors, resetForm }) => {
                                            (async () => {
                                                console.log('OPT', values);
                                                verifyOTP(values)
                                            })();
                                        }}
                                    >
                                        {({ errors, touched, values, setFieldValue }) => (
                                            <Form className="col-md-12 px-3">
                                                <Row>
                                                    <Col md="6">
                                                        <div className="mb-2">
                                                            <label className="form-label  fs-7">OTP <span className="text-danger">*</span></label>
                                                            <Field
                                                                type="number"
                                                                placeholder="OTP"
                                                                name="otp"
                                                                className="form-control"
                                                                autoComplete="off"
                                                            />
                                                            <small className="text-danger">{error?.otp?.[0] ? error?.otp?.[0] : <ErrorMessage name="otp" />}</small>
                                                        </div>
                                                    </Col>
                                                    <Col md="6" className="col-6 mt-4 pt-2">
                                                        <Button className="submitbtn" variant="primary" type="submit"> Verify OTP </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>}

                        <div className={`card ${(!id && !verified) ? 'guest' : 'user'}`}>
                            <div className="card-header bg-light">
                                <h5 className="mb-0">Payment Method</h5>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="form-check mb-0" >
                                        {/* <input disabled={(!id && !verified)} className="form-check-input" type="radio" id="online" value="online" defaultChecked="checked" name="payment-method" /> */}
                                        <input disabled={(!id && !verified)} className="form-check-input" type="radio" id="online" value="online" checked={paymentMethod !== 'cod'} name="payment-method" onChange={(e) => setpaymentMethod(e.target.value)} />
                                        <label className="form-check-label mb-2 fs-6" htmlFor="online">Online Payment</label>
                                    </div>
                                    {(parseInt(is_cod) === 1) && <div className="form-check d-flex align-items-center">
                                        {/* 2842, Q - 2843 */}
                                        {/* <input disabled={(!id && !verified)} className="form-check-input" type="radio" id="cod" value="cod" name="payment-method" /> */}
                                        {/* <input disabled={getCart?.products?.some(product => (product.product_id == 2842 || product.product_id == 2843)) || (!id && !verified)} className="form-check-input" type="radio" id="cod" value="cod" name="payment-method" checked={paymentMethod === 'cod'} data-bs-toggle="modal"

                                            // <input disabled={(!id && !verified)} className="form-check-input" type="radio" id="cod" value="cod" name="payment-method" checked={paymentMethod === 'cod'} data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop" /> */}

                                          <input disabled={(disabledCOD() || isSblEmployee)} className="form-check-input" type="radio" id="cod" value="cod" name="payment-method" checked={paymentMethod === 'cod'} data-bs-toggle="modal"
                                            onChange={(e) => setpaymentMethod(e.target.value)} />
                                        <label className="form-check-label mb-0 ms-2" htmlFor="cod">Cash on Delivery</label>
                                    </div>}
                                    {(subTotal?.value < 499 || isSblEmployee) && <small className="text-danger">{isSblEmployee ? 'COD is not enabled with SBL employees coupon' : 'Cart Sub-Total should be greater then 500 for enable COD'}</small>}

                                </div>
                                <div className="row">
                                    <div className="col-lg-5 ps-lg-4 ps-xl-2 ps-xxl-5 text-center text-md-start text-xl-center text-xxl-start">

                                        <div className="border-dashed-bottom d-block d-md-none d-xl-block d-xxl-none my-4" />
                                        <div className="fs-2 fw-semi-bold">All Total: <span className="text-primary">
                                            {cartTotal()}</span>
                                        </div>
                                        <div style={{ color: 'red', fontWeight: 'bold' }}>{errorMsg}</div>
                                        <button onClick={getCart?.warning === '' ? submitOrder : undefined} className="btn btn-success mt-3 px-5" type="submit" disabled={!disabled}>Confirm &amp; Pay</button>
                                        <p className="fs--1 mt-3 mb-0">By clicking <strong>Confirm &amp; Pay </strong>button you agree to the <Link to={`${public_path}/terms-conditions`}>Terms &amp; Conditions</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">COD Charges</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            COD Charges {changeCurrency(50)}.00 Applicable
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={(e) => setpaymentMethod("cod")} data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const Select2 = ({ isDisabled, form, field, options = [], label = "", onChangeCustom = () => null }) => {
    const [myValue, setMyValue] = useState(null);
    useEffect(() => {
        if (field.value) { options.forEach(row => { row.name === field.value && setMyValue(row) }) }
        else { setMyValue(null) }
    }, [field.value, options])

    return (
        <Select
            key={`my_unique_select_key__${field.value}`}
            closeMenuOnSelect={true}
            isClearable
            isDisabled={isDisabled}
            options={options}
            defaultMenuIsOpen={false}
            placeholder={`Select ${label}`}
            classNamePrefix="react-select"
            isOptionSelected={(option, selectValue) => selectValue.some(i => i === option)}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            value={myValue}
            onChange={(value) => {
                onChangeCustom(value)
                setMyValue(value)
                form.setFieldValue(field.name, value?.name)
            }}
        />
    )
};

export default CheckOut