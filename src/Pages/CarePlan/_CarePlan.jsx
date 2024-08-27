import react, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { hand, memberShip, product } from "../../utils/icons";
import useCart from '../../Hooks/useCart';
import "./care-plan.css"

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

	const x = () => {
		var element = document.getElementById("membership");

		element.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<>
			<section className="care-plan-section hero-banner">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6">
							<h2 className="heading-fw-4">
<<<<<<<< HEAD:src/Pages/CarePlan/_CarePlan.jsx
								SBL Care Plaffffffn <br className="d-block" />
								<span>FREE Shipping <br className="d-block" /></span>
								<span>	Order above   &#8377;200/-</span>
							</h2>
							<h3 className="heading-fw-4">	Additional <span className="heading-fw-1"> 3% OFF</span> on<span className="heading-fw-1"> Cart Value</span></h3>
							<ul>
								<li>SBL members can enjoy an additional 3% off on cart value.</li>
								<li>FREE Online Consultation (3 months subscription).</li>
								<li>Get a free surprise gift, and many more.</li>
							</ul>
========
								“Empowering life Naturally”<br className="d-block" />
								<span>With <br className="d-block" /></span>
>>>>>>>> 353834d35e9f21e71b043b1a329dd28c2239bdb7:src/Pages/CarePlan/CarePlan.jsx

							</h2>
							<h3> <span className="sbl-banner-1">SBL</span>&nbsp;Care Plan
								<span className="d-block yourparner-health"> Your Partner in health & Happiness</span>
							</h3>

							<div className="explor-lans-link-wrap">
								<button class="btn text-white explor-lans-link" onClick={() => x()}>Explore Plans</button>

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
									<p>Limted Period Offer*</p>
								</div>
								<div className="membershiplist">
									<h3>Membership Includes</h3>
									<ul>
										<li>- Get additional 3% off on Cart Value</li>
										<li>- Free Shipping on order above ₹200</li>
										<li><del>- 1 Complimentary Premium Online Consultation0</del></li>
										<li><del>- Get a free surprise gift on your 1st order</del></li>
									</ul>

									<div className="subscribe-link">
										<button type="button"
											disabled={loading === 'quaterly'}
											onClick={() => addToCartIni(2852, 1, 'quaterly')} className={`btn ${loading === 'quaterly' ? 'btn-loading' : ''}`}>
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
										1 Quaterly Plan
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
									<p>Limted Period Offer*</p>
								</div>
								<div className="membershiplist">
									<h3>Membership Includes</h3>
									<ul>
										<li>- Get additional 3% off on Cart Value</li>
										<li>- Free Shipping on order above ₹200</li>
										<li>- 1 Complimentary Premium Online Consultation0</li>
										<li>- Get a free surprise gift on your 1st order</li>


									</ul>

									<div className="subscribe-link">
										<button type="button"
											disabled={loading === 'monthly'}
											onClick={() => addToCartIni(2851, 1, 'monthly')} className={`btn ${loading === 'monthly' ? 'btn-loading' : ''}`}>
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

			{/* <section className="care-plan-section pamper">
				<div className="container benefits position-relative">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-8 pe-md-0">
							<h1>
								Rejuvenate Your Spirit With The <br />
								<span>
									Holistic Magic Of
								</span><br />
								<span className="borderTop">
									Homeopathy
								</span>
							</h1>

						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-4 lifeStyle">
							<p>
								LifeStyle get <br /> exclusive saving
							</p>
						</div>
					</div>
				</div>
			</section> */}

			{/* <section className="care-plan-section membership">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-6 membership-description">
							<h3 className="d-flex align-items-center position-relative heading-fw-4 exclusive-hr">Exclusive
								<hr className="position-absolute end-0 opacity-100 " />
							</h3>
							<h1 className="text-uppercase">Membership</h1>
							<h3 className="heading-fw-5 unbeatable">Unbeatable Offer</h3>
							<hr className="opacity-100" />
							<h4>
								Here is our exclusive membership offer!
							</h4>
							<p>
								<i>
									Join today and get all the benefits of our &#8377; 599 membership for the low price of
									&#8377; 199 for three months. Use our unique sale line item to take advantage of this
									limited-time deal and make your first-time purchase a great steal. You will receive two complimentary premium online consultations. Benefits from
									professional advice and personalized guidance from the comfort of your own
									home.
								</i>
							</p>

							<h4 className="mb-1">
								Receive free shipping on orders over &#8377; 200.
							</h4>
							<p>
								<i className="mb-3 d-block">
									Take advantage of This chance fo pamper yourself and enjoy a quality experience.
								</i>
							</p>
							<button type="button"
								disabled={loading === 'quaterly'}
								onClick={() => addToCartIni(2851, 1, 'quaterly')} className={`btn heading-fw-1 disable ${loading === 'quaterly' ? 'btn-loading' : ''}`}>
								<span className="btn-text">
									Join Now
								</span>
							</button>

							<p>To take advantage of our incredible membership offer.</p>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-6 membership-image">
							<img src={memberShip} alt="" className="img-fluid" />
						</div>
					</div>
				</div>
			</section> */}

			{/* <section className="care-plan-section best-deals">
				<div className="container position-relative">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-7">
							<h1>
								<span>Don&#39;t Miss</span> <br className="d-block" />
								<span className="heading-fw-5 best-border">	out On These</span>
							</h1>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-5 mt-auto text-sm-center">
							<button type="button" className="btn heading-fw-1 deals-btn">Best Deals</button>
						</div>

						<p>
							For just &#8377; 99 per month, you can get additional valve with a world of advantages, exclusive savings, and premium services. Enhance your shopping experience without spending a
							fortune. With our &#8377; 99 monthly membership subscription, get access to exclusive services and benefits. It&#39;s an incredible deal you can&#39;t resist that offers convenience, savings and A-1 value.
						</p>
						<div className="col subscribe">
							<button type="button"
								disabled={loading === 'monthly'}
								onClick={() => addToCartIni(2852, 1, 'monthly')} className={`btn border text-white ${loading === 'monthly' ? 'btn-loading' : ''}`}>
								<span className="btn-text">
									Join Now
								</span>
							</button>

							<p>
								Join today and experience the
								<br />
								benefits of the subscription that await you for just &#8377;99/month.
							</p>
						</div>
					</div>
				</div>
			</section> */}

			{/* <section className="care-plan-section surprise pb-5">
				<div className="container">
					<div className="row">
						<div className="col">
							<img src={hand} alt="" className="img-fluid" />
							<h1 className="heading-fw-3 mb-3">
								<span>Get A surprise Gift on</span>
							</h1>
							<h1 className="heading-fw-3">
								<span>your first order</span>
							</h1>
							<p className="surprise-details mt-4"> We have a delightful surprise for you as a taken of our appreciation. You will receive a surprise gift with your first order. </p>

							<p className="surprise-details">It&#39;s our way of saying &#39;thank you&#39; for choosing us. Unravel something extraordinary that has been carefully crafted exclusive for you.</p>

							<p className="surprise-details">This surprise gift makes your shopping experience with us even more unique, whether you&#39;re a new member or renewing your memebership plan.</p>

							<p className="surprise-extra-details">Don&#39;t miss out on this incredible opportunity
								order or renew your membership immediately!
							</p>
						</div>
					</div>
				</div>
			</section> */}

			{/* <section className="care-plan-section discount">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-12 col-lg-5  col-xl-5 col-xxl-4 position-relative">
							<h1>3</h1>
							<aside>
								<h4>Extra</h4>
								<h4 className="text-capitalize">% off</h4>
							</aside>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-7  col-xl-7 col-xxl-8 discount-details">
							<p>
								Good news, y'all! We're offering an extra 3% discount on cart value. Enjoy additional savings on top of our existing low prices. It's our gesture to make sure you receive the best possible offer. Simply add a coupon code at the checkout and see your total discount. Use this exclusive deal to enhance your shopping experience. Don't pass up the chance to save even more money.
							</p>
							<h3>
								Start shopping now and receive 3% off your total cart value.
							</h3>
						</div>
					</div>
				</div>
			</section> */}

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
											How do | become a member and avail myself of the Rs. 599
											membership offer for just Rs. 199 for three months?
										</button>
									</h2>
									<div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
											What are the benefits of the membership, apart from the
											two free premium online consultations?
										</button>
									</h2>
									<div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
											How can | qualify for free shipping on orders above
											Rs. 200/-?
										</button>
									</h2>
									<div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
										<div className="accordion-body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
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
