import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { formatDateDDMMYYYY } from "../helper/StringHelper";
import useSetting from "../Hooks/useSetting"
import { Button, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MetaTags from "../Components/MetaTags";
const MySwal = withReactContent(Swal)

const SignupSchema = Yup.object().shape({
    rating: Yup.number().min(1, "Please select rating first.").max(5, "Please select rating first.").required("Please select rating first."),
    comment: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required("Please enter review."),
});

const returnSchema = Yup.object().shape({
    return_reason_id: Yup.number()
        .min(1, "Please select reason first.")
        .max(5, "Please select reason first.")
        .required("Please select reason first."),
    comment: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required("Please enter your comment."),
});

const MyOrderList = () => {

    const ipCheck = false;
    const [data, setData] = useState([])
    const [show, setshow] = useState(false)
    const { changeCurrency } = useSetting()
    


    const [pageCurrent, setPageCurrent] = useState(1)
    const [reviewForm, setReviewForm] = useState(false)
    const [returnReasons, setReturnReasons] = useState([])
    const [reviewData, setreviewData] = useState({
        product_id: '',
        order_id: '',
        rating: 0,
        comment: ""
    })

    const [returnForm, setReturnForm] = useState(false)
    const [returnData, setReturnData] = useState({
        order_id: '',
        product_id: '',
        return_reason_id: '',
        comment: '',
    })

    const [pageMax, setPageMax] = useState(1)
    const [param, setParam] = useState({ limit: 10, page: 1 })
    const [details, setDetails] = useState({
        customer_email: "",
        customer_mobile: "",
        customer_name: "",
        date: "",
        discount: 0,
        history: [],
        is_allow_return: false,
        id: 0,
        order_no: "",
        order_status_id: 1,
        payment_json: null,
        payment_status: null,
        payment_type: 0,
        products: [],
        return_detail: null,
        shipping_address_1: "",
        shipping_address_2: "",
        shipping_amount: 0,
        shipping_city: "",
        shipping_country: "",
        shipping_postcode: "",
        shipping_state: "",
        subtotal: 0,
        tax_amount: 0,
        total: 0,
        transaction_payment_id: null,
        updated_at: "",
        user_comment: "",
        user_id: null,
        razorpay_payment_Id: "",
        round_off: 0,
        waybill: null,
        waybill_error: "",
        invoice_no: null,
        invoice_date: null,
        order_ipaddresss: "",
        currency: "",
        conversion_value: "",
        deleted_at: null,
        created_at: null,
        current_status: "",
        color: "",
    })

    const getOrders = useCallback(async () => {
        var { data } = await AxiosHelper.getData(`get_orderlist`, param);
        if (data.status === true) {
            setPageMax(data?.total);
            setData(data.data)
            setReturnReasons(data.return_reasons)
            data.data.forEach((row, key) => {
                if (row.id === details.id) {
                    setDetails(row)
                }
            })
        }
        else {
            toast.error(data.message);
        }
    }, [param, details.id])

    useEffect(() => { getOrders() }, [getOrders]);

    const showDetails = (data) => {
        setDetails(data);
        setshow(true);
    }

    const switchNext = () => {
        if (pageCurrent <= pageMax) {
            setParam(prev => ({ ...prev, page: prev.page + 1 }))
            setPageCurrent(pageCurrent + 1)
        }
    }

    const switchPrev = () => {
        if (pageCurrent >= 1) {
            setParam(prev => ({ ...prev, page: prev.page - 1 }))
            setPageCurrent(pageCurrent - 1)
        }
    }

    const cancelMyOrder = async (order_id) => {
        var { isConfirmed } = await MySwal.fire({
            title: 'Are you Sure.?',
            text: "You want to cancel this order.",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Cancel it!'
        })

        if (isConfirmed) {
            var { data } = await AxiosHelper.postData(`cancelorder`, { order_id });
            if (data.status === true) {
                getOrders()
                setshow(false)
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        }
    }

    const giveReview = (product_id, order_id) => {
        setreviewData(prev => ({ ...prev, product_id, order_id }))
        setReviewForm(true)
        setshow(false)
    }

    const returnProduct = async (product_id, order_id, details = null) => {
        if (!details) {
            setReturnData(prev => ({ ...prev, product_id, order_id }))
            setReturnForm(true)
            setshow(false)
        } else {

            let html = `
            <ul class="list-group fs-7 fw-normal">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="w-30 text-start">Return Date : </span> 
                    <span class="w-60 text-end">${formatDateDDMMYYYY(details?.created_at)}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="w-30 text-start">Return Reasons : </span>
                    <span class="w-60 text-end">${details?.return_reasons}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="w-30 text-start">Return Status : </span>
                    <span class="w-60 text-end">${details?.return_status}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="w-30 text-start">Comment : </span>
                    <span class="w-60 text-end">${details?.comment}</span>
                </li>
                `

            if (details?.return_actions)
                html += `<li class="list-group-item d-flex justify-content-between align-items-center">
                        <span class="w-30 text-start">Return Actions : </span>
                        <span class="w-60 text-end">${details?.return_actions}</span>
                    </li>`

            html += `</ul>`;

            MySwal.fire({
                title: 'Return Details',
                html,
                confirmButtonText: 'Okay'
            })
        }
    }

    return (
        <>
            <MetaTags data={{ title: 'My orders' }} />
            <div className="container my-4">
                <div className="card mb-3" id="ordersTable">
                    <div className="card-header">
                        <div className="row flex-between-center">
                            <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                                <h5 className="mb-0 text-nowrap py-2 py-xl-0">Orders</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive scrollbar">
                            <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                                <thead className="bg-200 text-900">
                                    <tr>
                                        <th className="px-2">Order</th>
                                        <th>Date</th>
                                        <th style={{ minWidth: '12.5rem' }}>Ship To</th>
                                        <th className="text-center">Status</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="list" id="table-orders-body">
                                    {data?.map((item, i) => (
                                        <tr className="" key={i}>
                                            <td className="py-2 align-middle p-2">
                                                <span role="button" className="text-decoration-none" onClick={() => showDetails(item)} >
                                                    <strong className="pe-1 text-primary">{item?.order_no}</strong>
                                                </span>
                                                by <strong>{item?.customer_name}</strong><br />
                                                {item?.customer_email}
                                            </td>
                                            <td className="date py-2 align-middle">{formatDateDDMMYYYY(item?.date)}</td>
                                            <td className="address py-2 align-middle white-space-nowrap">
                                                {item?.shipping_address_1}, {item?.shipping_address_2}, {item?.shipping_city}, {item?.shipping_state}, {item?.shipping_country} {item?.shipping_postcode}
                                            </td>
                                            <td className="status py-2 align-middle text-center white-space-nowrap">
                                                {item?.payment_status === 0 ?
                                                    <><span className="rounded-pill badge px-3 bg-danger">Unpaid</span> <br /></> : null}
                                                <span className={`rounded-pill badge px-3 ${item?.color}`}>{item?.current_status}</span>
                                            </td>
                                            <td className="amount p-2  align-middle text-end fw-medium">
                                                {changeCurrency(item?.total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data.length === 0 && <h5 className='text-danger text-center my-2'>Not Order found</h5>}
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex align-items-center justify-content-center">
                            <button onClick={switchPrev} className="btn btn-sm btn-falcon-default me-1" disabled={pageCurrent === 1}>
                                <span className="fas fa-chevron-left" /> Previous
                            </button>
                            <button onClick={switchNext} className="btn btn-sm btn-falcon-default ms-1" disabled={pageCurrent >= pageMax}>
                                Next <span className="fas fa-chevron-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                fullscreen
                show={show} onHide={() => setshow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="myScroll">
                    <div className="card mb-3">
                        <div className="card-body  d-flex justify-content-between">
                            <div className="col-md-8">
                                <h5>Order Details: {details?.order_no}</h5>
                                <small className="fs--1">{formatDateDDMMYYYY(details?.date)}</small>
                                <div>
                                    <strong className="me-2">Status: </strong>
                                    <div className={`badge rounded-pill fs--2 px-2 ${details.color}`}>
                                        {details?.current_status}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-right">
                                {details?.order_status_id === 1 &&
                                    <button className="btn btn-sm btn-danger" onClick={() => cancelMyOrder(details?.id)}>Cancel Order</button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 mb-4 mb-lg-0">
                                    <h5 className="mb-3">Shipping Address</h5>
                                    <h6 className="mb-2 fw-bold">{details?.customer_name}</h6>
                                    <p className="mb-1 fs--1">
                                        {details?.shipping_address_1}, {details?.shipping_address_2}<br />
                                        {details?.shipping_city}, {details?.shipping_state}, {details?.shipping_country} {details?.shipping_postcode}
                                    </p>
                                    <p className="mb-0 fs--1"><strong>Email: </strong>{details?.customer_email}</p>
                                    <p className="mb-0 fs--1"><strong>Phone: </strong>{details?.customer_mobile}</p>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <h5 className="mb-3">Payment Details</h5>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center">
                                            <h6 className="mb-0 fw-bold me-1">Payment Type : </h6>
                                            <p className="mb-0 fs--1"><span className="badge bg-info">{details?.payment_type === 1 ? "Online" : "Cash On Delivery"}</span></p>
                                        </div>
                                        <div className="flex-0 mt-1 d-flex align-items-center">
                                            <h6 className="mb-0 me-2 fw-bold">Payment ID : </h6>
                                            <p className="mb-0 fs--1">{details?.transaction_payment_id ? details?.transaction_payment_id : 'N/A'}</p>
                                        </div>
                                        <div className="flex-1 mt-1 d-flex align-items-center">
                                            <h6 className="mb-0 me-2 fw-bold">Payment Status : </h6>
                                            <p className="mb-0 fs--1">{details?.payment_type === 1 ? (details?.payment_status === 0 ? <span className="rounded-pill badge px-3 bg-danger">Unpaid</span> : <span className="rounded-pill badge px-3 bg-success">Paid</span>) : "--"}</p>
                                        </div>

                                       {details?.waybill && <div className="flex-1 mt-1 d-flex align-items-center">
                                            <h6 className="mb-0 me-2 fw-bold">WayBill : </h6>
                                            <p className="mb-0 fs--1">{details?.waybill} (Delivery)</p>
                                        </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body p-0">
                            <div className="table-responsive fs--1">
                                <table className="table table-striped border-bottom">
                                    <thead className="bg-gray text-900 ">
                                        <tr>
                                            <th className="border-0">Products</th>
                                            <th className="border-0 text-center">Quantity</th>
                                            <th className="border-0 text-end">Rate</th>
                                            <th className="border-0 text-end">Amount</th>
                                            <th className="border-0 text-end">
                                                {details?.order_status_id === 5 ? 'Action' : null}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {details?.products?.map((item, i) => (
                                            <tr className="border-200" key={i}>
                                                <td className="align-middle">
                                                    <h6 className="mb-0 text-nowrap"> {item.name}
                                                        {item?.attributes?.attr?.length === 0 ?
                                                            <span className="ms-1">{item?.sapid ? `(${item?.sapid})` : null}</span> : <span className="ms-1"> {item?.attributes?.sapid ? `(${item?.attributes?.sapid})` : null} </span>
                                                        }

                                                    </h6>
                                                    <p className="mb-0 ">
                                                        {item?.attributes?.attr?.map((rows, j) => (
                                                            <small key={j} className="pe-2 badge bg-success rounded-0 me-1">{rows?.attribute_master_name} : <b>{rows?.attribute_name}</b> </small>
                                                        ))}
                                                    </p>
                                                </td>
                                                <td className="align-middle text-center">{item.quantity}</td>
                                                <td className="align-middle text-end">{changeCurrency(item?.price)}</td>
                                                <td className="align-middle text-end">{changeCurrency(item?.total)}</td>

                                                <td className="align-middle text-end">
                                                    {details?.order_status_id === 5 &&
                                                        <button onClick={() => giveReview(item?.product_id, details?.id)} className="btn btn-sm fw-bold btn-outline-primary" disabled={item?.rating ? true : false}>{item?.rating ? 'Reviewed' : 'Review'}</button>
                                                    }
                                                    {details?.is_allow_return &&
                                                        <button onClick={() => returnProduct(item?.product_id, details?.id, item?.return_detail)} className="btn btn-sm fw-bold btn-outline-danger ms-1" disabled={false}>{item?.return_detail ? 'Return Details' : 'Return'}</button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row g-0 justify-content-end pe-3">
                                <div className="col-md-4 px-3">
                                    <table className="table table-sm table-borderless fs--1 text-end">
                                        <tbody>
                                            <tr>
                                                <th className="text-900">Subtotal :</th>
                                                <td className="fw-semi-bold">{ipCheck ? changeCurrency(details?.subtotal) : changeCurrency(details?.subtotal + details?.tax_amount)}</td>
                                            </tr>
                                            {(details?.tax_amount && ipCheck) ? <tr>
                                                <th className="text-900">Tax :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.tax_amount)}</td>
                                            </tr> : ""}
                                            {details?.discount ? <tr>
                                                <th className="text-900">Discount :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.discount)}</td>
                                            </tr> : ""}
                                            {details?.member_discount ? <tr>
                                                <th className="text-900">Care Plan Discount :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.member_discount)}</td>
                                            </tr> : ""}
                                            {details?.cod_charges ? <tr>
                                                <th className="text-900">COD Charges :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.cod_charges)}</td>
                                            </tr> : ""}
                                            {<tr>
                                                <th className="text-900">Shipping Charge :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.shipping_amount)}</td>
                                            </tr>}
                                            {details?.round_off ? <tr>
                                                <th className="text-900">Round Off :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.round_off)}</td>
                                            </tr> : ""}
                                            <tr className="border-top">
                                                <th className="text-900">Total :</th>
                                                <td className="fw-semi-bold">{changeCurrency(details?.total)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <h4 className="text-center">Order Status</h4>
                                        <ul className="timeline">
                                            {details?.history?.map((item, i) => (
                                                <li key={i} className="d-flex justify-content-between">
                                                    <p className="mb-1">{item?.order_status}</p>
                                                    <p className="mb-1 text-end">
                                                        <b>{formatDateDDMMYYYY(item?.created_at)}</b> <br />
                                                        <small>({item?.comment})</small>
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setshow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={reviewForm} centered onHide={() => setReviewForm(false)}>
                <Modal.Header className="py-2" closeButton>
                    <Modal.Title>Rate Products</Modal.Title>
                </Modal.Header>
                <Modal.Body className="myScroll">
                    <Formik
                        initialValues={reviewData}
                        validationSchema={SignupSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            (async () => {
                                var { data } = await AxiosHelper.postData("saveproductreview", { ...reviewData, ...values });
                                if (data.status === true) {
                                    toast.success(data.message);
                                    getOrders()
                                    setReviewForm(false)
                                }
                                else {
                                    toast.error(data.message);
                                }
                            })();
                        }}
                    >
                        {({ errors, touched, values }) => (
                            <Form className="col-md-12 mx-auto">
                                <div>
                                    <div className="mb-3">

                                        <Field component={StarRating} name="rating" />
                                        <ErrorMessage component="span" className="text-danger small" name="rating" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Your Comments</label>
                                        <Field as='textarea' className="form-control" name="comment" value={values.comment} rows={3} />
                                        <ErrorMessage component="span" className="text-danger small" name="comment" />
                                    </div>
                                    <div className="mb-3">
                                        <Button variant="primary" type="submit"> Update </Button>
                                    </div>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <Modal show={returnForm} centered onHide={() => setReturnForm(false)}>
                <Modal.Header className="py-2" closeButton>
                    <Modal.Title>Return Products</Modal.Title>
                </Modal.Header>
                <Modal.Body className="myScroll">
                    <Formik
                        initialValues={returnData}
                        validationSchema={returnSchema}
                        enableReinitialize
                        onSubmit={(values) => {
                            (async () => {
                                var { data } = await AxiosHelper.postData("returnproduct", { ...returnData, ...values });
                                if (data.status === true) {
                                    toast.success(data.message);
                                    getOrders()
                                    setReturnForm(false)
                                }
                                else {
                                    toast.error(data.message);
                                }
                            })();
                        }}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="col-md-12 mx-auto">
                                <div>
                                    <div className="mb-3">
                                        <select
                                            className="form-select"
                                            name="return_reason_id"
                                            value={values.return_reason_id}
                                            onChange={e => setFieldValue('return_reason_id', e.target.value)}
                                        >
                                            <option value="">Select Reason</option>
                                            {returnReasons?.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                                        </select>
                                        <ErrorMessage component="span" className="text-danger small" name="return_reason_id" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Your Comments</label>
                                        <Field as='textarea' className="form-control" name="comment" value={values.comment} rows={3} />
                                        <ErrorMessage component="span" className="text-danger small" name="comment" />
                                    </div>
                                    <div className="mb-3">
                                        <Button variant="primary" type="submit"> Submit </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            
        </>
    )
}

const StarRating = ({ form, field }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span
                        type="button"
                        key={index}
                        className="rating-btn text-blue"
                        onClick={() => {
                            setRating(index)
                            form.setFieldValue(field.name, index)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <i className={`mx-1 ${index <= (hover || rating) ? 'fa fa-star' : 'fa-regular fa-star'}`} />
                    </span>
                );
            })}
         
        </div>
    );
};

export default MyOrderList