import { Button, Card, Container, Image, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { Link, useNavigate } from "react-router-dom";
import { formatDateDDMMYYYY, strLimit } from "../helper/StringHelper";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const BlogList = (props) => {
	const public_path = process.env.REACT_APP_PUBLIC_URL;
	const navigate = useNavigate()

	return (
		<>
			<section className="form-the-blog">
				<div className="container">
					<div className="row">
						<div className="form-blog-heading">
							<h3>From The Blog</h3>
						</div>

						{props.top_blog?.length > 0 &&
							<Swiper
								// install Swiper modules
								modules={[Navigation, Pagination, Autoplay]}
								slidesPerView={4}
								spaceBetween={20}
								navigation={true}
								speed={1000}
								className="mySwiper"

								keyboard={{
									enabled: true
								}}

								autoplay={{
									delay: 4000,
									disableOnInteraction: true
								}}

								breakpoints={{
									350: {
										slidesPerView: 1,
										spaceBetween: 10
									},
									550: {
										slidesPerView: 2,
										spaceBetween: 10
									},
									667: {
										slidesPerView: 3,
										spaceBetween: 10
									},
									992: {
										slidesPerView: 3,
										spaceBetween: 10
									},
									1200: {
										slidesPerView: 4,
										spaceBetween: 20

									}
								}}

							>
								{
									props.top_blog.map((item) => {
										return (
											<SwiperSlide>
												<a href={`${public_path}/blogs/${item.seo_url}`}>
													<div className="saving-swiper-card">

														<div class="card">
															<div className="blog-images">

																<Image
																	src={item.image}
																	alt='Blog images'
																	width={320}
																	height={150}
																	className="img-fluid"
																/>
															</div>

															<div class="card-body">
																<div className="date-time">
																	<p><span>{formatDateDDMMYYYY(item.created_at)}</span></p>
																</div>
																<h6>{strLimit(item.title, 25)}</h6>

																<p>{strLimit(item.sort_description, 50)}</p>

																<Button onClick={() => navigate(`${public_path}/blog/${item.slug}`)} type="submit"> READ MORE </Button>
															</div>
														</div>
													</div>

												</a>

											</SwiperSlide>
										)
									})
								}
							</Swiper>
						}
					</div>

				</div>
			</section>
			{/* <Container>
					<Row>
						
					</Row>
					<Carousel
						swipeable={false}
						draggable={false}
						// showDots={true}
						infinite
						responsive={bloagtile}
					>
						{props.top_blog.map((blog, key) => (
							<Card style={{ width: "18em" }} className="blogcard" key={key}>
								<Link to={`/blogs/${blog?.seo_url}`}>
									<img
										src={blog.image}
										className="card-img-top w-100"
										
										alt="img"
									/>
								</Link>

								<Card.Body className="min-height-100">
								<div className="date w-60 ms-2">
										{formatDateDDMMYYYY(blog.created_at)}
									</div>
									<Card.Title className="bold themefont">
										<Link className="text-decoration-none text-dark" to={`/blogs/${blog?.seo_url}`}>{strLimit(blog.title, 25)}</Link>
									</Card.Title>
									<Card.Text className="themefont text-left">
										{strLimit(blog.sort_description, 50)}
									</Card.Text>
									<Link className="readbtn text-decoration-none w-40 p-2" to={`/blogs/${blog?.seo_url}`}> READ MORE</Link>
								</Card.Body>
							
							</Card>
						))}
					</Carousel>
				</Container> */}
		</>
	);
};

export default BlogList;
