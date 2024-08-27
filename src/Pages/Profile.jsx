import react, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import SubHeader from "../Components/SubHeader";
import ProfileMenus from "../Components/include/ProfileMenus";
import useProfile from "../Hooks/useProfile";
import useCart from "../Hooks/useCart";
import useSetting from "../Hooks/useSetting";
import MetaTags from "../Components/MetaTags";

const public_path = process.env.REACT_APP_PUBLIC_URL

const Profile = () => {
	const { name, email, image, sbl_care_plan } = useProfile();
	const { changeCurrency } = useSetting()

	const { addToCart } = useCart()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const addToCartIni = (id, qty) => {
		setLoading(true)
		try {
			addToCart(id, qty, "{\"2\":26}")
				.then(res => {
					if (res) {
						setLoading(false)
						navigate(`${public_path}/cart`)
					} else {
						setLoading(false)
					}
				})
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<MetaTags data={{ title: 'Dashboard' }} />
			<SubHeader heading="Dashboard" />
			<Container fluid className="pt-5">
				<Container className="login-form">
					<Row className="pb-5">

						<Col md={4} className="pe-4">

							<div className="col-sm-12 mb-2 d-none d-md-block">
								<div className="profile-wrap">
									<div className="p-3 px-3 mb-2 d-flex">
										<aside className="profile-img-wrap">
											<img className="rounded-circle bg-white" src={image || ''} alt="" width={60} height={60} />
										</aside>
										<div className="profile-content ms-3">
											<h5 className="text-white mb-0">{name || ''}</h5>
											<p className="text-white mb-0">{email || ''}</p>
											{/* <p className="mb-0">
															<Link className="text-decoration-none text-white" to={`#`}>
																View activity
															</Link>
														</p> */}
										</div>
									</div>

									<div className="member-pack d-flex justify-content-between align-items-center p-2 px-3 border-top">
										<div>
											<h6 className="text-white mb-0">{sbl_care_plan?.membership_history?.length === 0 && 'Become a'} SBI Care Plan Member</h6>
											{/* <span>{differenceInDays(sbl_care_plan?.membership_history[0]?.)} sbl_care_plan?.membership_history days left</span> */}
										</div>
										{sbl_care_plan?.is_active && <Link className="text-decoration-none text-white position-relative fw-bold" to={`${public_path}/membership/savings`}>saved {changeCurrency(sbl_care_plan.total_savings)}</Link>}
										{!sbl_care_plan?.is_active && sbl_care_plan?.membership_history?.length > 0 && <button type="button"
											disabled={loading}
											onClick={() => addToCartIni(sbl_care_plan?.plan_details?.product_id || 2851, 1)} className={`btn text-white fw-bold position-relative ${loading ? 'btn-loading' : ''}`}>
											<span className="btn-text">
												Subscribe Today
											</span>
										</button>}
										{sbl_care_plan?.membership_history?.length === 0 &&
											<Link className="text-decoration-none btn text-white fw-bold position-relative" to={`${public_path}/care-plan`}>
												see benefits
											</Link>
										}
									</div>
								</div>
							</div>
							<ProfileMenus />
						</Col>
						<Col md={8} className="pe-4">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col-sm-12">
											<h4 className="text-success fw-bolder">Dashboard</h4>
											<hr />
										</div>

										<div className="col-sm-12 mb-2 d-sm-none d-md-none">
											<div className="profile-wrap">
												<div className="p-3 px-3 mb-2 d-flex">
													<aside className="profile-img-wrap">
														<img className="rounded-circle bg-white" src={image || ''} alt="" width={60} height={60} />
													</aside>
													<div className="profile-content ms-3">
														<h5 className="text-white mb-0">{name || ''}</h5>
														<p className="text-white mb-0">{email || ''}</p>
														{/* <p className="mb-0">
															<Link className="text-decoration-none text-white" to={`#`}>
																View activity
															</Link>
														</p> */}
													</div>
												</div>

												<div className="member-pack d-flex justify-content-between align-items-center p-2 px-3 border-top">
													<h6 className="text-white mb-0">{sbl_care_plan?.membership_history?.length === 0 && 'Become a'} SBI Care Plan Member</h6>
													{sbl_care_plan?.is_active && <Link className="text-decoration-none text-white position-relative fw-bold" to={`#`}>saved {changeCurrency(sbl_care_plan.total_savings)}</Link>}
													{!sbl_care_plan?.is_active && sbl_care_plan?.membership_history?.length > 0 && <button type="button"
														disabled={loading}
														onClick={() => addToCartIni(sbl_care_plan?.plan_details?.product_id || 2851, 1)} className={`btn border text-white ${loading ? 'btn-loading' : ''}`}>
														<span className="btn-text">
															Subscribe Today
														</span>
													</button>}
													{sbl_care_plan?.membership_history?.length === 0 &&
														<Link className="text-decoration-none btn border text-white" to={`${public_path}/care-plan`}>
															see benefits
														</Link>}

												</div>
											</div>
										</div>

										<div className="col-sm-3 my-2">
											<Link className="text-decoration-none" to={`${public_path}/update-profile`}>
												<div className="text-center dash-icon">
													<i className="text-muted fa fa-user fa-3x mb-2"></i>
													<p className="text-success my-0 fs-6 fw-bold">Update Profile</p>
												</div>
											</Link>
										</div>
										<div className="col-sm-3 my-2">
											<Link className="text-decoration-none" to={`${public_path}/change-password`}>
												<div className="text-center dash-icon">
													<i className="text-muted fa-solid fa-user-lock fa-3x mb-2"></i>
													<p className="text-success my-0 fs-6 fw-bold">Change Password</p>
												</div>
											</Link>
										</div>
										<div className="col-sm-3 my-2">
											<Link className="text-decoration-none" to={`${public_path}/my-addresses`}>
												<div className="text-center dash-icon">
													<i className="text-muted fa-solid fa-map-location-dot fa-3x mb-2"></i>
													<p className="text-success my-0 fs-6 fw-bold">My Addresses</p>
												</div>
											</Link>
										</div>
										<div className="col-sm-3 my-2">
											<Link className="text-decoration-none" to={`${public_path}/my-orders`}>
												<div className="text-center dash-icon">
													<i className="text-muted fa-solid fa-cart-arrow-down fa-3x mb-2"></i>
													<p className="text-success my-0 fs-6 fw-bold">My Orders</p>
												</div>
											</Link>
										</div>
										<div className="col-sm-3 my-2">
											<Link className="text-decoration-none" to={`${public_path}/my-orders-return`}>
												<div className="text-center dash-icon">
													<i className="text-muted fa-solid fa-truck-fast fa-3x mb-2"></i>
													<p className="text-success my-0 fs-6 fw-bold">My Return Orders</p>
												</div>
											</Link>
										</div>

									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	)
}

export default Profile