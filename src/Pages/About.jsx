import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Container, Row, Tab, Col, Nav, Image } from "react-bootstrap";
import SubHeader from "../Components/SubHeader";
import AxiosHelper from "../helper/AxiosHelper";
import Service from "../Components/Service";
import InstaFollow from "../Components/InstaFollow";
import MetaTags from "../Components/MetaTags";

const About = () => {

	const [data, setData] = useState({
		cms_detail: {
			cms_group: "",
			name: "",
			cms_title: "",
			meta_title: "",
			meta_keyword: "",
			meta_description: "",
			cms_contant: "",
			image: "",
		},
		cms: [],
		company: [],
		certified: "",
		instafeed: []
	})

	useEffect(() => {
		(async () => {
			var { data } = await AxiosHelper.getData("aboutcompany");
			if (data.status === true) {
				setData(data.data)
			} else {
				toast.error(data.message);
			}
		})();
	}, []);

	return (
		<>
			<MetaTags data={{ title: data?.cms_detail?.cms_group }} />

			<SubHeader heading={data?.cms_detail?.cms_group} backgroundImage={data?.cms_detail?.image}></SubHeader>

			<div className='container-fluid bgabouttheme'>
				<div className='container' dangerouslySetInnerHTML={{ __html: data?.cms_detail?.cms_contant }}></div>
			</div>

			<CompanyLocations company={data?.company} />

			<div className="w-100 bgtheme">
				<div className="container" dangerouslySetInnerHTML={{ __html: data?.cms?.[1] }}></div>
			</div>

			<div className="w-100">
				<div dangerouslySetInnerHTML={{ __html: data?.cms?.[2] }}></div>
			</div>

			<div className="container">
				<div dangerouslySetInnerHTML={{ __html: data?.cms?.[3] }}></div>
			</div>

			<div className="container">
				<div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
			</div>

			<InstaFollow />

			<Service feeds={data?.instafeed} />
		</>
	);
};


export const CompanyLocations = ({ company = [] }) => {

	return (
		<Container fluid className="bgwhite mb-3">
			<Container>
				<Tab.Container id="left-tabs-example" defaultActiveKey="data-0" style={{ maxHeight: 350 }}>
					<Row style={{ height: "100%" }}>
						<Col sm={3} className="abutimagescat">
							<Nav variant="pills" className="flex-column">
								{company.map((item, i) => (
									<Nav.Item key={i}>
										<Nav.Link eventKey={`data-${i}`}>{item.name} <i className='fa-solid fa-caret-right'></i></Nav.Link>
									</Nav.Item>
								))
								}
							</Nav>
						</Col>
						<Col sm={9} className="aboutimg">
							<Tab.Content>
								{company.map((item, i) => (
									<Tab.Pane eventKey={`data-${i}`} key={i}>
										<div className="office-detail">
											<Row>
												<Col lg="6" xs="12">
													<div className="left">
														<div className="head">{item.title}</div>
														<div className="contant">
															<Image className="img-fluid" src={item.image} alt="sbl1"></Image>
														</div>
													</div>
												</Col>
												<Col lg="6" xs="12">
													<div className="right">
														<div className="list-item">
															<span className="fa fa-map-location-dot"></span>
															<p>
																{item.address_1} {item.address_2}, {item.city}, {item.state_id}, {item.country_id}, {item.postcode}
															</p>
														</div>
														<div className="list-item">
															<span className="fa fa-mobile-retro"></span>

															<p>{item.company_fax}</p>
														</div>
														<div className="list-item">
															<span
																className="fa-solid fa-mobile-screen"
																aria-hidden="true"
															></span>
															<p>{item.company_contact}</p>
														</div>
														<div className="list-item">
															<span className="fa-solid fa-envelope-open-text"></span>
															<p>{item.company_email}</p>
														</div>
														<div className="list-item">
															<span className="fa fa-map-location-dot"></span>
															<a className="text-decoration-none list-item" target="__lucky" href={`https://maps.google.com/?q=${item.address_1}, ${item.address_2}, ${item.city}, ${item.state_id}, ${item.country_id}, ${item.postcode}`}>Get Direction</a>
														</div>
														<Row className="pt-5">
															<a href={`tel:${item.company_contact?.split(',')?.[0]}`} className="btn btn-success col-md-5 col-sm-4  col-xs-4 p-2 ml-2">Call us</a>
															<a href={`mailto:${item.company_email}`} className="btn btn-success col-md-5 col-sm-4 col-xs-4 p-2 ml-2">Drop a message</a>
														</Row>
													</div>
												</Col>
											</Row>
										</div>
									</Tab.Pane>
								))
								}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</Container>
	);
};

export default About;
