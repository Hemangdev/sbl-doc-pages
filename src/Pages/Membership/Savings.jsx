import react, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AxiosHelper from "../../helper/AxiosHelper";
import { formatDateDDMMYYYY } from "../../helper/StringHelper";
import { hideLoader, showLoader } from "../../helper/LoaderHelper";
import useSetting from "../../Hooks/useSetting";
import MetaTags from "../../Components/MetaTags";

const public_path = process.env.REACT_APP_PUBLIC_URL

const MembershipSavings = () => {
	const { changeCurrency } = useSetting()

	const [savings, setSavings] = useState([])

	useEffect(() => {
		(async () => {
			showLoader()
			var { data } = await AxiosHelper.getData(`membership/savings`);
			if (data.status === true) {
				hideLoader()
				setSavings(data.data)
			}
			else {
				hideLoader()
				toast.error(data.message);
			}
		})();
	}, []);

	return (
		<>
			<MetaTags data={{ title: 'Membership saving' }} />
			<div className="container my-4">
				<div className="card mb-3" id="savingTable">
					<div className="card-header">
						<div className="row flex-between-center">
							<div className="col-4 col-sm-auto d-flex align-items-center pe-0">
								<h5 className="mb-0 text-nowrap py-2 py-xl-0">SBL Care Plan - Savings</h5>
							</div>
						</div>
					</div>
					<div className="card-body p-0">
						<div className="table-responsive scrollbar">
							<table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
								<thead className="bg-200 text-900">
									<tr>
										<th className="px-2">Order ID</th>
										<th scope="col">Order Number</th>
										<th scope="col">Created At</th>
										<th scope="col">Total Items</th>
										<th scope="col">Total Amount</th>
										<th scope="col">Saved Amount</th>
									</tr>
								</thead>
								<tbody className="list" id="table-saving-body">
									{savings?.map((item, i) => (
										<tr className="" key={i}>
											<td className="align-middle p-2">{item?.order_id || ''}</td>
											<td className="align-middle">{item?.order_no || ''}</td>
											<td className="align-middle">{formatDateDDMMYYYY(item?.order_date)}</td>
											<td className="align-middle">{item?.total_items || '0'}</td>
											<td className="align-middle">{changeCurrency(item?.total_amount || '0')}</td>
											<td className="align-middle">{changeCurrency(item?.saved_amount || '0')}</td>

										</tr>
									))}
								</tbody>
							</table>
							{savings.length === 0 && <h5 className='text-danger text-center my-2'>Not Order found</h5>}
						</div>
					</div>
					<div className="card-footer"></div>
				</div>
			</div>
		</>
	);
};

export default MembershipSavings;
