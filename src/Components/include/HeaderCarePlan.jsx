import React, { memo, useState } from "react";
import { Carousel, Container, Navbar } from "react-bootstrap"
import { useEffect } from "react";
// import WhatsappIcon from "../../image/whatsapp.svg";
import { Link } from "react-router-dom";

const public_path = process.env.REACT_APP_PUBLIC_URL

const HeaderCarePlan = () => {

	return (
		<>
			<Navbar bg=" top-header-careplan flex-wrap" expand="lg" >

				<Container fluid className="get-discount">
					<Container className="get-discount-wrap">
						<Carousel autoPlay={true}>
							<Carousel.Item >
								<h6>🌟 SBL CarePlan - ₹599 membership offer for just ₹199 for three months <Link to={`${public_path}/care-plan`} >read more</Link></h6>
							</Carousel.Item>

							<Carousel.Item >
								<h6>🎉 SBL CarePlan - ₹150 membership offer for just ₹99 for one month 
									{/* <Link to={`${public_path}/care-plan`} >read more</Link> */}
									</h6>
							</Carousel.Item>
						</Carousel>
					</Container>
				</Container>
			</Navbar >
		</>
	);
};

export default memo(HeaderCarePlan);