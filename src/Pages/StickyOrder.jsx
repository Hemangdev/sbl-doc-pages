import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

const StickyOrder = () => {
const navigate = useNavigate();
const [visible, setVisibility] = useState(1);

    return (
        <div className="stickyOrder" style={{display: visible ? 'block': 'none'}}>
            <div className="container">
            <div className="table-responsive scrollbar ">
                            <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                                <thead className="bg-200 text-900">
                                    <tr>
                                        <th className="px-2">Order</th>
                                        <th>Date</th>
                                        <th style={{ minWidth: '12.5rem' }}>Ship To</th>
                                        <th className="text-center">Status</th>
                                        <th>Amount</th>
                                        <th>View</th>
                                        <th><button className="btn btn-sm" onClick={() => setVisibility(0)}><i className="fa fa-close"></i></button></th>
                                    </tr>
                                </thead>
                                <tbody className="list " id="table-orders-body">
                                   
                                        <tr className="">
                                            <td className="py-2 align-middle p-2">
                                                <span role="button" className="text-decoration-none" >
                                                    <strong className="pe-1 text-primary">SBL-0000000007801 </strong>
                                                </span>
                                                by <strong>
                                                test abhishek.jarsys@gmail.com</strong><br />
                                                
                                            </td>
                                            <td className="date py-2 align-middle">24 Mar, 2023</td>
                                            <td className="address py-2 align-middle white-space-nowrap">
                                            test, test, Pali, Rajasthan, India 306902
                                            </td>
                                            <td className="status py-2 align-middle text-center white-space-nowrap">
                                               
                                                    <><span className="rounded-pill badge px-3 bg-danger">Unpaid</span> <br /></> 
                                                <span className="rounded-pill badge px-3"></span>
                                            </td>
                                            <td className="amount p-2  align-middle text-end fw-medium">
                                            ₹150
                                            </td>
                                            <td><button className="btn btn-primary" onClick={()=>{
                                               navigate('/my-orders', { replace: true });
                                            }}>View</button></td>
                                            <td>&nbsp;</td>
                                        </tr>
                                
                                </tbody>
                            </table>
                           
                        </div>
            </div>

        </div>
    )
}

export default StickyOrder;