import React from "react";
import Carousel from "react-multi-carousel";
import { Col, Modal, Nav, Row, Tab } from "react-bootstrap";
import ProductBox from "../include/Products/ProductBox";
import SubHeader from "../SubHeader";

const CurrentTemplateProduct = ({
	data,
	ButtonGroup,
	Review,
	responsive,
	price,
	specialPrice,
	mrp,
	ipCheck,
	perUnitData,
	setShowReview,
	changeAttr,
	attr,
	handelQty,
	qty,
	errorMsg,
	isDisabled,
	addToCartIni,
	buyNow,
	submitPostalCode,
	setPostCode,
	setPostCodeMessage,
	postCodeMessage,
	responsive_2,
	showReview,
	strLimit
}) => {
	return (
		<>
			<SubHeader heading={data?.name} main={data?.category?.name} />

			<div className="w-100 bg-white">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<Carousel responsive={responsive} infinite renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup image={data?.image} />} className="w-100 text-center">
								{data?.image?.map((image, i) => (
									<div key={i} className="my-product-image border-success">
										<img src={image} alt="" />
									</div>
								))}
							</Carousel>
						</div>
						<div className="col-md-6 p-4 product_detail">
							<div className="d-flex flex-column">
								<h2 className='heading'>{data?.name}</h2>
								<div className='d-flex justify-content-between'>
									<h5>Price : <span dangerouslySetInnerHTML={{ __html: price }} /> {specialPrice < mrp && <span style={specialPrice != mrp ? { textDecoration: 'line-through', fontSize: '14px' } : { textDecoration: 'default' }} dangerouslySetInnerHTML={{ __html: mrp }} />}
										{ipCheck && false ? <span className='small text-blue ms-1'>({data?.gst_name})</span> : null}
										{(perUnitData.attribute_int && perUnitData.attribute_unit) &&
											<span className='small text-blue mx-1'>( ₹{perUnitData?.attribute_int} / {perUnitData?.attribute_unit} )</span>
										}
									</h5>
									<Review avg_review={data?.avg_review} total={data?.reviews?.length} showReadReview={setShowReview} />
								</div>
								{data?.variants?.map((item, i) => (
									<div className='my-1' key={i}>
										<h6 className='py-2'> {item?.attr_name} : </h6>
										<div className="d-flex gap-2 flex-wrap">
											{item?.attribute?.map((row, j) => (
												<div className="form-check-radio" key={j}>
													<input className="form-check-input d-none" type="radio" value={row.id} onChange={() => changeAttr(item?.attr_id, row?.id)} checked={attr[item?.attr_id] === row?.id} name={item?.attr_id} id={`${i}_${j}`} />
													<label className={`btn btn-sm rounded-0 btn-outline-success`} htmlFor={`${i}_${j}`}>
														{row?.name}
													</label>
												</div>
											))}
										</div>
									</div>
								))}

								<div className='my-2 d-flex align-items-center'>
									<span>Quantity</span>
									<div className="input-group mx-2">
										<button onClick={() => handelQty('-')} className="input-group-text bg-none rounded-0"><i className="fa fa-minus"></i></button>
										<input type="text" onChange={handelQty} min={1} max={10} className="form-control fw-bold text-center" value={qty} style={{ maxWidth: 60 }} />
										<button onClick={() => handelQty('+')} className="input-group-text bg-none rounded-0"><i className="fa fa-plus"></i></button>
									</div>
								</div>
								<div style={{ color: 'red' }}>
									{errorMsg}
								</div>
								<div className="my-2">
									<button type="button" onClick={() => !isDisabled && addToCartIni(data.id, qty)} className='btn btn-blue me-1 rounded-0 text-uppercase px-4' disabled={isDisabled}>Add to Cart</button>
									<button type="button" onClick={() => !isDisabled && buyNow(data.id, qty)} className='btn btn-success ms-1 rounded-0 text-uppercase' disabled={isDisabled}>Buy Now</button>
								</div>
								<form className="row mt-0" onSubmit={submitPostalCode}>
									<div className="col-sm-6">
										<label className="my-1 fw-bold">Deliver to : </label>
										<input onChange={e => {
											setPostCode(e.target.value)
											setPostCodeMessage({ status: true, message: "" })
										}} type="text" className="form-control rounded-0" placeholder="Postal Code" />
									</div>
									<div className="col-sm-6" style={{ height: 72 }}>
										<label className='my-1 d-block'><br /></label>
										<button type="submit" className="btn btn-blue me-1 rounded-0 text-uppercase mb-3">Check Postal Code</button>
									</div>
									<div className="col-sm-12 my-0">
										<small className={`my-1 fw-bold ${postCodeMessage?.status ? "text-success" : "text-danger"}`}>{postCodeMessage?.message}</small>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="row pb-4">
						<div className="col-md-12">
							<div className="contanier">
								<Tab.Container id="left-tabs-example" defaultActiveKey="data-indication">
									<Row>
										<Col sm={3} className="abutimagescat">

											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link className='text-uppercase' eventKey={`data-indication`}>Indication / Benefits <i className='fa-solid fa-caret-right'></i></Nav.Link>
												</Nav.Item>
											</Nav>
											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link className='text-uppercase' eventKey={`data-ingredient`}>Key Ingredients <i className='fa-solid fa-caret-right'></i></Nav.Link>
												</Nav.Item>
											</Nav>
											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link className='text-uppercase' eventKey={`data-dosage`}>Dosage <i className='fa-solid fa-caret-right'></i></Nav.Link>
												</Nav.Item>
											</Nav>
											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link className='text-uppercase' eventKey={`data-safety`}>Safety Information <i className='fa-solid fa-caret-right'></i></Nav.Link>
												</Nav.Item>
											</Nav>
										</Col>
										<Col sm={9} className="aboutimg overflow-auto myScroll-blue py-4" style={{ height: 350 }}>
											<Tab.Content>

												<Tab.Pane eventKey={`data-indication`}>
													<div className="office-detail p-4">
														<div className="row">
															<div className="col-md-6">
																<h2 className="text-success fw-bold">Indication / Benefits</h2>
															</div>

														</div>
														<div className="text-justify" dangerouslySetInnerHTML={{ __html: data?.indication }} />
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey={`data-ingredient`}>
													<div className="office-detail p-4">
														<div className="row">
															<div className="col-md-6">
																<h2 className="text-success fw-bold">Key Ingredients</h2>
															</div>

														</div>
														<div className="text-justify" dangerouslySetInnerHTML={{ __html: data?.ingredient }} />
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey={`data-dosage`}>
													<div className="office-detail p-4">
														<div className="row">
															<div className="col-md-6">
																<h2 className="text-success fw-bold">Dosage</h2>
															</div>

														</div>
														<div className="text-justify" dangerouslySetInnerHTML={{ __html: data?.dosage }} />
													</div>
												</Tab.Pane>
												<Tab.Pane eventKey={`data-safety`}>
													<div className="office-detail p-4">
														<div className="row">
															<div className="col-md-6">
																<h2 className="text-success fw-bold">Safety Information</h2>
															</div>

														</div>
														<div className="text-justify" dangerouslySetInnerHTML={{ __html: data?.safety }} />
													</div>
												</Tab.Pane>
											</Tab.Content>
										</Col>
									</Row>
								</Tab.Container>
							</div>
						</div>
					</div>
				</div>
				{data?.relatedproducts?.length > 0 ?
					<div style={{ backgroundColor: '#f7fff0' }}>
						<div className="container">
							<div className="row py-4">
								<div className="col-md-12">
									<div className="head mb-4 mt-2">
										<h5 className="blogtitle text-uppercase"> Related Products</h5>
									</div>
								</div>
								<div className="col-md-12">
									<Carousel
										ssr={true}
										partialVisbile={false}
										infinite
										itemClass="slider-image-item"
										responsive={responsive_2}
										containerClass="carousel-container-with-scrollbar"
									>
										{data?.relatedproducts?.map((item, i) => <ProductBox item={item} key={i} />)}
									</Carousel>
								</div>
							</div>
						</div>
					</div>
					: ""}
			</div>

			<Modal scrollable size='lg' show={showReview} onHide={() => setShowReview(false)}>
				<Modal.Header className='py-2' closeButton>
					<Modal.Title>Read Review</Modal.Title>
				</Modal.Header>
				<Modal.Body className='myScroll-blue'>
					<div className="row">
						{data?.reviews?.map((item, i) => (
							<div className="col-md-6" key={i}>
								<div className="d-flex review align-items-center flex-wrap border border-primary p-2 rounded-3">
									<div className="">
										<img className="profile-pic" alt='' width={50} height={50} src="public/asset/images/avatar.png" />
									</div>
									<div className="d-flex flex-column">
										<h5 className="mt-2 mb-0">{item?.customer_name}</h5>
										<div className='mt-2'>
											<Review avg_review={item?.rating} />
										</div>
									</div>
									<div className="w-100 mt-2">
										<small className="text-muted fs-7">
											{strLimit(item?.comment, 100)}
										</small>
									</div>
								</div>
							</div>
						))}
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CurrentTemplateProduct;