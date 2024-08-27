import react, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import useCart from '../../Hooks/useCart';
import "./care-plan.css"
import MetaTags from "../../Components/MetaTags";

const public_path = process.env.REACT_APP_PUBLIC_URL

const CarePlan = () => {
	const { addToCart, updateMyCart } = useCart()
	const navigate = useNavigate()

	const [loading, setLoading] = useState('')

	const addToCartIni = (id, qty, label) => {
		setLoading(label)
		try {
			addToCart(id, qty, "{\"2\":26}")
				.then(res => {
					if (res) {
						setLoading('')
						navigate(`${public_path}/cart`)
					} else {
						setLoading('')
					}
				})
		} catch (error) {
			console.log(error);
		}
	}

	const scroll = () => {
		var element = document.getElementById("membership");

		element.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<>
			<MetaTags data={{ title: 'Care plan' }} />
			<section className="care-plan-section hero-banner">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
							<h2 className="heading-fw-4">
								“Empowering life Naturally”<br className="d-block" />
								<span>With <br className="d-block" /></span>

							</h2>
							<h3> <span className="sbl-banner-1">SBL</span>&nbsp;Care Plan
								<span className="d-block yourparner-health"> Your Partner in health & Happiness</span>
							</h3>

							<div className="explor-lans-link-wrap">
								<button class="btn text-white explor-lans-link" onClick={() => scroll()}>Explore Plans</button>

								{/* <a href="#membership" class="btn text-white explor-lans-link">Explore Plans</a> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="choose-plan-section" id="membership">
				<div className="container">
					<div className="row">
						<div className="choose-plan-headding">
							<h3>Choose a plan that's right for you</h3>
						</div>
						<div className="col-xl-5 col-xxl-5 col-lg-5 col-md-12 membership-left">
							<div className="checkbox-row">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="MonthPlan" id="MonthPlan1" />
									<label class="form-check-label" for="MonthPlan1">
										1 Month Plan
									</label>
									<div className="row">
										<div className="col-6">
											<div className="checkout-price-1">
												<h2><span>&#x20B9;</span>99</h2>
											</div>
										</div>

										<div className="col-6 mt-auto text-center">
											<div className="checkout-pirce-2">
												<del><span>₹150</span></del>
											</div>
										</div>
									</div>
									<p>Limited Period Offer*</p>
								</div>
								<div className="membershiplist">
									<h3>Membership Includes</h3>
									<ul>
										<li>- Get additional 3% off on Cart Value</li>
										<li>- Free Shipping on order above ₹200</li>
										<li><del>- 1 Complimentary Premium Online Consultation</del></li>
										<li><del>- Get a free surprise gift on your 1st order</del></li>
									</ul>

									<div className="subscribe-link">
										<button type="button"
											disabled={loading === 'quaterly'}
											// 2852
											onClick={() => addToCartIni(2842, 1, 'quaterly')} className={`btn ${loading === 'quaterly' ? 'btn-loading' : ''}`}>
											<span className="btn-text">
												Subscribe Now
											</span>
										</button>
										{/* <a href="#">Subscribe Now</a> */}
									</div>
								</div>
							</div>
						</div>

						<div className="col-xl-2 col-xxl-2 col-lg-2 col-md-2 border-middle"><span className="vr"></span></div>
						<div className="col-xl-5 col-xxl-5 col-lg-5 col-md-12 membership-right">
							<div className="checkbox-row">
								<div class="form-check">
									<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
									<label class="form-check-label" for="flexRadioDefault1">
										3 Months Plan
									</label>
									<div className="row">
										<div className="col-6">
											<div className="checkout-price-1">
												<h2><span className="&#8377;">₹</span>199</h2>
											</div>
										</div>

										<div className="col-6 mt-auto text-center">
											<div className="checkout-pirce-2">
												<del><span>₹599</span></del>
											</div>
										</div>
									</div>
									<p>Limited Period Offer*</p>
								</div>
								<div className="membershiplist">
									<h3>Membership Includes</h3>
									<ul>
										<li>- Get additional 3% off on Cart Value</li>
										<li>- Free Shipping on order above ₹200</li>
										<li>- 1 Complimentary Premium Online Consultation</li>
										<li>- Get a free surprise gift on your 1st order</li>
									</ul>

									<div className="subscribe-link">
										<button type="button"
											disabled={loading === 'monthly'}
											// 2851
											onClick={() => addToCartIni(2843, 1, 'monthly')} className={`btn ${loading === 'monthly' ? 'btn-loading' : ''}`}>
											<span className="btn-text">
												Subscribe Now
											</span>
										</button>
										{/* <a href="#">Subscribe Now</a> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="care-plan-section need-assistance">
				<div className="container">
					<div className="row">
						<div className="col">
							<h3>
								Need Assistancs?
							</h3>
							<p className="heading-fw-5 mb-0">
								Do you need assistance? We're here to help! Our professional support team is here to answer any questions or concerns. We're just a click or phone call away if you need help placing an order, tracking a shipment, or have other inquiries. Rest assured; we are devoted to providing excellent customer service and ensuring your complete pleasure.
							</p>
							<p className="heading-fw-3 mb-0">Contact us immediately and let us take care of your requirements.</p>
							<h4 className="mb-4 heading-fw-3">We prioritize your comfort.</h4>
							<Link to={`/contact-us`} className="btn heading-fw-4" >
								Click here
							</Link>
							{/* <button type="button" className="btn heading-fw-4" onClick={() => navigate(`${public_path}/contact-us`)}>Click here</button> */}
						</div>
					</div>
				</div>
			</section>

			<section className="care-plan-section faq">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-6">
							<h3>
								Read Our <br />
								FAQ to Learn More
							</h3>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-6">
							<div className="accordion accordion-flush" id="accordionFlushExample">
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
											How do I become a member and avail myself of the ₹599
											membership offer for just ₹199 for three months?
										</button>
									</h2>
									<div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">Sign up for our special membership to get these fantastic benefits: Enjoy an extra 3% discount on your cart value, receive free shipping on orders over ₹200, access a complimentary premium online consultation, and don't forget to claim your free surprise gift with your first order. Don't miss this limited-time deal!</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
											What are the benefits of the membership, apart from the
											one free premium online consultation?
										</button>
									</h2>
									<div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">Become a member now and get amazing perks: 3% off Cart Value, free shipping on orders over ₹200, and a surprise gift with your first order. Don't miss out on these exclusive benefits.</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
											How can I qualify for free shipping on orders above
											₹200?
										</button>
									</h2>
									<div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">To get free shipping on orders over ₹200, choose either the 1 Month Plan for ₹99 or the 3 Month Plan for ₹199. Shop hassle-free and save on shipping!</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CarePlan;
