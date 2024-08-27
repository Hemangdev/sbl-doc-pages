import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { formatDateDDMMYYYY } from "../helper/StringHelper";
// import useSetting from "../Hooks/useSetting"
import { useCallback } from "react";
import { Modal, Button } from "react-bootstrap"
import MetaTags from "../Components/MetaTags";

const MyOrderReturn = () => {

    const [data, setData] = useState([])
    // const { changeCurrency, ipCheck } = useSetting()
    const [pageCurrent, setPageCurrent] = useState(1)
    const [show, setShow] = useState(false)
    const [pageMax, setPageMax] = useState(1)
    const [param, setParam] = useState({ limit: 10, page: 1 })
    const [details, setDetails] = useState({
        order_id: null,
        order_no: "",
        product_id: null,
        product_name: "",
        product_model: "",
        customer_id: null,
        customer_name: "",
        customer_email: "",
        customer_mobile: "",
        return_reason_id: null,
        return_status_id: null,
        return_action_id: null,
        comment: "",
        date_ordered: "",
        created_at: "",
        updated_at: "",
        return_reasons: "",
        return_status: "",
        return_actions: "",
        history: []
    })

    const getOrders = useCallback(async () => {
        var { data } = await AxiosHelper.getData(`get_returnlist`, param);
        if (data.status === true) {
            setPageMax(data?.total);
            setData(data.data)
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
        console.log(data);
        setDetails(data);
        setShow(true);
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

    return (
        <>
            <MetaTags data={{ title: 'My orders return' }} />
            <div className="container my-4">
                <div className="card mb-3" id="ordersTable">
                    <div className="card-header">
                        <div className="row flex-between-center">
                            <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                                <h5 className="mb-0 text-nowrap py-2 py-xl-0">Order Product Return</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive scrollbar">
                            <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                                <thead className="bg-200 text-900">
                                    <tr>
                                        <th className="px-2">Order</th>
                                        <th>Date Ordered</th>
                                        <th>Date Return</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Action</th>
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
                                                <small>{item?.product_name}</small>
                                            </td>
                                            <td className="date py-2 align-middle">{formatDateDDMMYYYY(item?.date_ordered)}</td>
                                            <td className="date py-2 align-middle">{formatDateDDMMYYYY(item?.created_at)}</td>
                                            <td className="py-2 align-middle text-center">
                                                <span className="badge rounded-pill bg-primary">{item?.return_status}</span>
                                            </td>
                                            <td className="p-2 align-middle text-center">
                                                {item?.return_actions ? <span className="badge rounded-pill bg-success">{item?.return_actions}</span> : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {data.length === 0 && <h5 className='text-danger text-center my-2'>Order not found</h5>}
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
                show={show} onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order Product Return Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="myScroll">
                    <div className="card mb-3">
                        <div className="card-body  d-flex justify-content-between">
                            <div className="col-md-8">
                                <h5>Order Details: {details?.order_no}</h5>
                                <small className="fs--1">Order Date : {formatDateDDMMYYYY(details?.date_ordered)}</small>
                                <div>
                                    <strong className="me-2">Status: </strong>
                                    <div className="badge rounded-pill bg-info text-white"> {details?.return_status}</div>
                                    {details?.return_actions ? <span className="badge rounded-pill bg-success ms-1">{details?.return_actions}</span> : "--"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-lg-6 mb-4 mb-lg-0">
                                    <h5 className="mb-3">Shipping Address</h5>
                                    <h6 className="mb-2 fw-bold">{details?.customer_name}</h6>

                                    <p className="mb-0 fs--1"><strong>Email: </strong>{details?.customer_email}</p>
                                    <p className="mb-0 fs--1"><strong>Phone: </strong>{details?.customer_mobile}</p>
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    <h5 className="mb-3">Product</h5>
                                    <div className="d-flex flex-column">
                                        <p className="mb-1"><b>Name</b> : {details.product_name}</p>
                                        <p className="mb-1"><b>Model</b> : {details?.product_model}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className="text-center">Order Return Status</h4>
                                        <ul className="timeline">
                                            {details?.history?.map((item, i) => (
                                                <>
                                                    <li key={i} className="d-flex justify-content-between">
                                                        <p className="mb-1">{item?.return_status}</p>
                                                        <p className="mb-1 text-end">
                                                            <b>{formatDateDDMMYYYY(item?.created_at)}</b> <br />
                                                            <small>({item?.comment})</small>
                                                        </p>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default MyOrderReturn