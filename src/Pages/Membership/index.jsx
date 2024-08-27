import react, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AxiosHelper from "../../helper/AxiosHelper";
import { formatDateDDMMYYYY } from "../../helper/StringHelper";
import { hideLoader, showLoader } from "../../helper/LoaderHelper";
import useSetting from "../../Hooks/useSetting";
import MetaTags from "../../Components/MetaTags";

const public_path = process.env.REACT_APP_PUBLIC_URL

const Membership = () => {
	const { changeCurrency } = useSetting()

	const [membership, setMembership] = useState([])

	useEffect(() => {
		(async () => {
			showLoader()
			var { data } = await AxiosHelper.getData(`membership`);
			console.log('data', data);
			if (data.status === true) {
				hideLoader()
				setMembership(data.data)
			}
			else {
				hideLoader()
				toast.error(data.message);
			}
		})();
	}, []);

	return (
		<>
			<MetaTags data={{ title: 'Membership' }} />
			<div className="container my-4">
				<div className="card mb-3" id="membershipTable">
					<div className="card-header">
						<div className="row flex-between-center">
							<div className="col-4 col-sm-auto d-flex align-items-center pe-0">
								<h5 className="mb-0 text-nowrap py-2 py-xl-0">SBL Care Plan - Purchase History</h5>
							</div>
						</div>
					</div>
					<div className="card-body p-0">
						<div className="table-responsive scrollbar">
							<table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
								<thead className="bg-200 text-900">
									<tr>
										<th className="px-2">Name</th>
										<th scope="col">Price</th>
										<th scope="col">Plan Duration</th>
										<th scope="col">Start Date</th>
										<th scope="col">End Date</th>
										<th scope="col">Consultation Free</th>
										<th scope="col">Consultation Used</th>
									</tr>
								</thead>
								<tbody className="list" id="table-membership-body">
									{membership?.map((item, i) => (
										<tr className="" key={i}>
											<td className="align-middle p-2">{item?.plan_name || 'Monthly'}</td>
											<td className="align-middle">{changeCurrency(item?.plan_price || '99')}</td>
											<td className="align-middle">{item?.plan_duration || '1'}{item?.plan_duration === 1 ? ' month' : ' months'}</td>
											<td className="align-middle">{formatDateDDMMYYYY(item?.start_date)}</td>
											<td className="align-middle">{formatDateDDMMYYYY(item?.end_date)}</td>
											<td className="align-middle">{item?.consultation_free}</td>
											<td className="align-middle">{item?.consultation_used}</td>

										</tr>
									))}
								</tbody>
							</table>
							{membership.length === 0 && <h5 className='text-danger text-center my-2'>Not Order found</h5>}
						</div>
					</div>
					<div className="card-footer">
					</div>
				</div>
			</div>
		</>
	);
};

export default Membership;
