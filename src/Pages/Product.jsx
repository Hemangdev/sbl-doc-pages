import { useState, useEffect } from "react";
import SubHeader from "../Components/SubHeader";
import { Container, Row, Col } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import ProductBox from "../Components/include/Products/ProductBox";
import CategorySideMenu from "../Components/include/Products/CaregorySideMenu"
import { hideLoader, scrollToTop, showLoader } from "../helper/LoaderHelper";
import MetaTags from "../Components/MetaTags";
const public_path = process.env.REACT_APP_PUBLIC_URL

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};


const Product = () => {

	const [data, setData] = useState([])
	const [notVaitable, setNotVaitable] = useState(false)
	useEffect(() => {
		(async () => {
			showLoader()
			var { data } = await AxiosHelper.getData(`products`);
			if (data.status === true) {
				if (data.data.total === 0) {
					setNotVaitable(true)
				}
				else {
					setNotVaitable(false)
				}
				setData(data?.data?.categories)
				scrollToTop()
				hideLoader()
			}
			else {
				toast.error(data.message);
			}
		})();
	}, []);

	return (
		<>
			<MetaTags data={{ title: 'Our Products' }} />
			<SubHeader heading="Our Products"></SubHeader>
			<Container fluid className="py-4 bg-white">
				<Row>

					<Col lg={{ span: 9, order: 1 }}>
						{data?.map((row, i) => (
							<div key={i}>
								{row?.product?.length > 0 && <Row className="pt-4">
									<Col md="12" className="d-flex justify-content-between themefont border-bottom mb-4">
										<div className="head  ">
											<h5 className="bold2 text-uppercase"> {row?.name}</h5>
										</div>
										<Link to={`${public_path}/product/${row?.slug}`} className="bold themefont"> View All</Link>
									</Col>
									<Col md="12">
										<Carousel
											ssr={true}
											partialVisbile={false}
											infinite
											itemClass="slider-image-item"
											responsive={responsive}
											containerClass="carousel-container-with-scrollbar"
										>
											{row?.product?.map((item, key) => (
												<ProductBox item={item} key={key} />
											))}
										</Carousel>
									</Col>
								</Row>}
							</div>
						))}
						{data.length === 0 && notVaitable && <h5 className='text-danger text-center'>No product found.</h5>}
					</Col>
					<Col lg={{ span: 3, order: 0 }}>
						<CategorySideMenu />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Product;
