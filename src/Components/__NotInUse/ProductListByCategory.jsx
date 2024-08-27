import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductRow from "../Components/ProductRow";

const ProductListByCategory = () => {
	const productlist = [
		{
			name: "Dell latitude i5",
			image: "https://i.imgur.com/ILEU18M.jpg",
			ram: "8GB",
			mrp: "380",
			price: "299",
		},
		{
			name: "Lenovo Altitude i7",
			image: "https://i.imgur.com/2kePJmX.jpg",
			ram: "4GB",
			mrp: "250",
			price: "199",
		},
		{
			name: "Microsoft Surface Pro",
			image: "https://i.imgur.com/ILEU18M.jpg",
			ram: "16GB",
			mrp: "650",
			price: "499",
		},
		{
			name: "Dell Xtreame 5",
			image: "https://i.imgur.com/2kePJmX.jpg",
			ram: "8GB",
			mrp: "380",
			price: "299",
		},
	];
	return (
		<div>
			<Row>
				<Col
					md="12"
					className="sorting d-flex align-items-center justify-content-end p-2"
				>
					<div className="d-flex align-items-center">
						<span>Sort By</span> &nbsp;&nbsp;
						<div>
							<select className="form-control">
								<option value="1">Default sorting</option>
								<option value="1">Default sorting</option>
								<option value="1">Default sorting</option>
							</select>
						</div>
						<div>
							<i className="pl-1 fa fa-th fa-2x"></i>
							<i className="pl-1 fa fa-list fa-2x"></i>
						</div>
					</div>
				</Col>
			</Row>
			<Row className="pt-4">
				<Col md="12" className="d-flex justify-content-between themefont">
					<div className="head  ">
						<h5 className="bold2"> HOMOEOPATHIC PRODUCT</h5>
					</div>
					<Link to="/" target="_blank" className="bold themefont ">
						View All
					</Link>
				</Col>
				<hr />
				{productlist.map((item, key) => (
					<Col md="3" key={key} className="productpagelist no-margin">
						<ProductRow data={item}></ProductRow>
					</Col>
				))}
			</Row>

			<Row className="pt-4">
				<Col md="12" className="d-flex justify-content-between themefont">
					<div className="head  ">
						<h5 className="bold2"> POMADES</h5>
					</div>
					<Link to="/" target="_blank" className="bold themefont ">
						View All
					</Link>
				</Col>
				<hr />
				{productlist.map((item, key) => (
					<Col md="3" key={key} className="productpagelist no-margin">
						<ProductRow data={item}></ProductRow>
					</Col>
				))}
			</Row>

			<Row className="pt-4">
				<Col md="12" className="d-flex justify-content-between themefont">
					<div className="head  ">
						<h5 className="bold2"> HOMOEOPATHIC PRODUCT</h5>
					</div>
					<Link to="/" target="_blank" className="bold themefont ">
						View All
					</Link>
				</Col>
				<hr />
				{productlist.map((item, key) => (
					<Col md="3" key={key} className="productpagelist no-margin">
						<div className="protile  mt-2">
							<Row>
								<Image className="d-block w-100" src={item?.image} alt="" />
								<p>{item?.name}</p>
							</Row>
							<Row className=" pricetile">
								<Col md="8" className="priceright">
									<div className="p1">&#8377; {item?.mrp}</div>
									<div className="p2">MRP: &#8377; {item?.price}</div>
									<div className="p3">You Save: &#8377; 70 (15%)*</div>
								</Col>
								<Link to="#" className="col-md-4 priceleft pt-4 pb-3">
									BUY NOW
								</Link>
							</Row>
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ProductListByCategory;
