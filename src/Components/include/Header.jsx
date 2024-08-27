import React, { memo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap"
import useCart from "../../Hooks/useCart";
import useProfile from "../../Hooks/useProfile";
import useSetting from "../../Hooks/useSetting";
// import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// import { strLimit } from "../../helper/StringHelper";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useEffect } from "react";
import AxiosHelper from "../../helper/AxiosHelper";
import HeaderCarePlan from "./HeaderCarePlan";
import { toast } from "react-toastify";
import axios from "axios";
import CounterDown from "../homePage/counterDown";
import Logo from "../../image/header-logo.jpeg";
import FacebookIcon from "../../image/facebook.svg";
import InstagramIcon from "../../image/instagram-icon.svg";
import TwitterIcon from "../../image/twitter.svg";
import Youtube from "../../image/youtube.svg";
import Linkdin from "../../image/linkdin.svg";







const MySwal = withReactContent(Swal)
const public_path = process.env.REACT_APP_PUBLIC_URL
// const currency_code = localStorage.getItem('currency_code')

const Header = (props) => {

	const { id } = useProfile();
	const { getCart } = useCart()
	const [expanded, setExpanded] = useState(false);
	const [category, setCategory] = useState([])
	// const [filter, setFilter] = useState(currency_code ? currency_code : "INR")
	const { path, logo, whatsapp_link, application_name } = useSetting()
	const navigate = useNavigate();
	const [show, setShowChange] = useState(false)
	const [searchParams] = useSearchParams();
	const search = searchParams.get('query')
	const [query, setQuery] = useState(search ? search : "")
	const [searchProcess, setSearchProcess] = useState(false);
	const [products, setProducts] = useState({});
	const [loading, setLoading] = useState(false);
	const [searchData, setSearchData] = useState('');

	const submitSearch = (e) => {
		e.preventDefault()
		setExpanded(false)
		setSearchData('')
		navigate({
			pathname: `${public_path}/product-search`,
			search: `?query=${query}`
		});


	}

	var path_url = window.location.pathname;

	const logout = async () => {

		var { isConfirmed } = await MySwal.fire({
			title: 'Are you sure?',
			text: "You want to logout..!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, I want.!'
		})

		if (isConfirmed) {
			navigate(`${public_path}/logout`)
		}
	}
	// Sticky Menu Area
	useEffect(() => {
		window.addEventListener('scroll', isSticky);
		return () => {
			window.removeEventListener('scroll', isSticky);
		};
	});


	/* Method that will fix header after a specific scrollable */
	const isSticky = (e) => {
		const header = document.querySelector('.sticky-header');
		const scrollTop = window.scrollY;
		scrollTop >= 100 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
	};

	useEffect(() => {
		(async () => {
			var { data } = await AxiosHelper.getData(`category`);
			if (data.status === true) {
				const categoryArray = []
				if (data?.data?.categories?.length > 0) {
					data?.data?.categories?.map((item) => {
						if (item.id === 4) {
							const data = [13, 14, 15, 16, 17]

							const hasMatchingChild = item?.children?.filter(child => data.includes(child.id));
							categoryArray.push({ ...item, children: hasMatchingChild })
						} else {
							categoryArray.push(item)
						}
					})
					setCategory(categoryArray)
				}
			}
		})();
	}, []);


	const setShow = (val) => {
		setShowChange(val)
		if (val === false) {
			const element = document.querySelector('.multi-dropdown-list');
			if (element) {
				const children = element.querySelectorAll('.dropdown-menu.show');
				for (const child of children) {
					child.classList.remove('show');
				}
			}
		}
	}

	let timer = 0;
	const onStopTyping = (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			setLoading(true);
			if (e.target.value.length === 0) {
				setSearchProcess(false);
				setLoading(false);
			}

			if (e.target.value.length > 0) {
				setSearchData(e.target.value)
				setSearchProcess(true);
				setTimeout(() => {
					// (async () => {
					// 	const { data } = await AxiosHelper.getData(`productlists?search=${e.target.value}`);
					// 	if (data.status === true) {
					// 		setProducts(data?.data)
					// 		setLoading(false)
					// 	}
					// 	else {
					// 		toast.error(data.message);
					// 		setLoading(false)
					// 	}
					// })()
					(async () => {
						try {
							const response = await axios.post(process.env.REACT_APP_API_URL + '/search', {
								keywords: e.target.value
							}, {
								headers: {
									'X-Api-Key': process.env.REACT_APP_API_KEY
								}
							});
							const data = response?.data?.response;
							if (response?.data?.success === true) {
								data.products = data?.products?.length === undefined ? Object.values(data.products) : data.products
								setProducts(data);
								setLoading(false);
							} else {
								toast.error(response?.data?.message);
								setLoading(false);
							}
						} catch (error) {
							setLoading(false);
							toast.error('An error occurred while processing your request.');
						}
					})();
				}, 500)

			}
		}, 1000);
	};

	const handleClick = (slug) => {
		return () => {
			navigate(slug);
		};
	};

	useEffect(() => {
		window.addEventListener('click', function (e) {
			if (document.getElementById('product-search-listing').contains(e.target)) {
				setSearchData('ffff')
			} else {
				setSearchData('')
			}
		});

		window.addEventListener('click', function (e) {
			if (!document.getElementById('expanded-function-data').contains(e.target) && !document.getElementById('basic-navbar-nav').contains(e.target)) {
				setExpanded(false)
			}
		});
	}, [])
	
	return (
		<>
			<CounterDown />

			<HeaderCarePlan />
			<header className="sticky-header">
				<Navbar expand="lg" expanded={expanded}>
					<Container fluid className="align-items-start header-padding">
						<Navbar.Brand as={Link} to={`${public_path}/home`}>
							<img src={Logo} alt={application_name} className="d-inline-block align-top" height={100} max-width={100} />
							{/* <span className="ms-1 fw-bold text-uppercase text-success d-md-block d-lg-none">{application_name}</span> */}
						</Navbar.Brand>
						<div className="d-flex flex-column d-md-none gap-1 min-180">
							<div className="d-flex justify-content-end align-items-center">
								{/* <Link to={`${public_path}/login`} className="btn btn-outline-gray px-3">Login</Link> */}
								{id ?
									<>
										<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium active my-login px-2" to={`${public_path}/profile`}>Profile</Link>
										<button className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted" onClick={logout}>Logout</button>
									</>
									:
									<>
										<Dropdown className="topmenu my-login">
											<Dropdown.Toggle className="active btn btn-sm text-decoration-none text-dark" variant="link" id="dropdown-basic"> Login </Dropdown.Toggle>
											<Dropdown.Menu className="p-0">
												<Dropdown.Item className="mx-0 py-1" style={{ height: 'auto' }} as={Link} to={`${public_path}/login`}>Buyer Account</Dropdown.Item>
												<Dropdown.Item className="mx-0 py-1" style={{ height: 'auto' }} target="__blank" href="http://dealerportal.sblglobal.com/" >Dealer Account</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted px-1" to={`${public_path}/register`}>REGISTER</Link>
									</>
								}
								<Link onClick={() => setExpanded(false)} className="d-flex align-items-center nav-link my-0" to={`${public_path}/cart`} >
									<span title="Cart" style={{ width: 25, height: 25 }}>
										<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
											<g><path d="M872.3,620.6c-15.8,44.9-57.9,75-104.9,75H325.7c-53,0-98.9-38.3-109.2-91l-74.9-384.1l-24.8-115.2H33.9C20.7,105.3,10,94.5,10,81.2C10,67.8,20.7,57,33.9,57H136c3.8,0.6,5.3,0.9,6.9,1.4c1.4,0.5,2.7,0.9,4,1.7c1.4,0.7,2.6,1.6,3.8,2.6c1.2,1,2.3,2,3.3,3.2c0.9,1.2,1.7,2.4,2.4,3.7c0.8,1.4,1.5,2.9,2,4.5c0.2,0.7,0.7,1.3,0.9,2l24.8,115.3h726.9c25.6,0,49.7,12.6,64.5,33.8c14.8,21.2,18.5,48.5,9.9,73L872.3,620.6z M936.6,253c-5.9-8.5-15.2-13.4-25.5-13.4H194l69.3,355.6c5.9,30.1,32.1,52,62.4,52h441.7c26.9,0,51-17.2,60-42.9l113.1-322.5C944,272.1,942.6,261.5,936.6,253L936.6,253L936.6,253z M308.4,748.1c53.1,0,96.2,43.7,96.2,97.4c0,53.8-43.2,97.5-96.2,97.5c-53,0-96.2-43.7-96.2-97.5C212.2,791.8,255.3,748.1,308.4,748.1L308.4,748.1L308.4,748.1z M308.4,894.7c26.7,0,48.5-22,48.5-49.1c0-27.1-21.8-49.1-48.5-49.1c-26.7,0-48.4,22-48.4,49.1C259.9,872.6,281.6,894.7,308.4,894.7L308.4,894.7L308.4,894.7z M733.5,748.1c53.1,0,96.2,43.7,96.2,97.4c0,53.8-43.1,97.5-96.2,97.5c-53,0-96.2-43.7-96.2-97.5C637.4,791.8,680.5,748.1,733.5,748.1L733.5,748.1L733.5,748.1z M733.5,894.7c26.8,0,48.5-22,48.5-49.1c0-27.1-21.8-49.1-48.5-49.1s-48.5,22-48.5,49.1C685.1,872.6,706.8,894.7,733.5,894.7L733.5,894.7L733.5,894.7z" /></g>
										</svg>
									</span>
									<span className="text-dark ms-1">{getCart?.products?.length}</span>
								</Link>
								{/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} /> */}

								<button  id="expanded-function-data" className="navbar-toggler shadow-none p-0 border-0" type="button">
								
									<input type="checkbox" id="hamburger" checked={expanded === 'expanded' ? true : false}/>
									<label htmlFor="hamburger" id="expanded-function-data" className={`hamburger ${expanded === 'expanded' ? 'cros-menu' : ''}`} onClick={() => {setExpanded(expanded ? false : "expanded")}}>
										<span className="line"></span>
										<span className="line"></span>
										<span className="line"></span>
									</label>
								</button>
							</div>
							<div className="d-flex">


								<input placeholder="Search..."
									aria-label="Search" type="search"
									className="me-2 topsearch form-control form-control-sm ps-3"
									value={query}
									onChange={e => { setQuery(e.target.value); onStopTyping(e); }} />

								{loading &&
									<div className="d-flex justify-content-center">
										<div class="spinner-border spinner-border-sm" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									</div>
								}

								{searchProcess && (products?.products || products?.categories) && !loading &&
									<div className={`search-results ${searchData?.length > 0 ? 'd-block' : ''}`} unselectable="on">
										{products?.categories?.length === 0 && products?.products?.length === 0 && !loading && <p className="d-flex justify-content-center">No record found.</p>}

										{products?.categories?.length > 0 && !loading &&
											<>
												<h6>Categories</h6>
												<div className="search-result-list">
													<ul class="list-unstyled">
														{products?.categories?.map((category: any) => {
															return (
																<>
																	<li>
																		<a onClick={handleClick(`/product/${category?.slug}`)} href={`/product/${category?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																			<span className="dgwt-wcas-si">
																				<img src={category?.image} height={60} width={60} alt={`${category?.name}`} />
																			</span><div className="dgwt-wcas-content-wrapp">
																				<div className="dgwt-wcas-st">
																					<span className="dgwt-wcas-st-title"><strong>{category?.name}</strong>
																					</span>
																				</div>
																			</div>
																		</a>
																	</li>
																</>
															)
														})}
													</ul>
												</div>
											</>
										}

										{products?.products?.length > 0 && !loading &&
											<>
												<h6>Products</h6>
												<div className="search-result-list">
													<ul class="list-unstyled">
														{products?.products?.map((product: any) => {
															return (
																<>
																	<li>
																		<a onClick={handleClick(`/product-details/${product?.slug}`)} href={`/product-details/${product?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																			<span className="dgwt-wcas-si">
																				{product?.image && <img src={product?.image} height={60} width={60} alt={product?.name} />}
																			</span><div className="dgwt-wcas-content-wrapp">
																				<div className="dgwt-wcas-st">
																					<span className="dgwt-wcas-st-title"><strong>{product?.category_name?.length > 0 ? `${product?.name?.replace(/\\|'/g, '')} - ${product?.category_name?.replace(/\\|'/g, '')}` : product?.name?.replace(/\\|'/g, '')}</strong>
																					</span>
																				</div>
																			</div>
																		</a>
																	</li>
																</>
															)
														})}
													</ul>
												</div>
											</>
										}
									</div >
								}

								<span>
									<button onClick={submitSearch} type="button" className="search-button btn btn-primary">
										<i className="fa fa-search fs-6"></i>
									</button>
								</span>
							</div>

						</div>

						<Navbar.Collapse className="flex-column" id="basic-navbar-nav">
							<div className="border-bottom d-md-block d-lg-flex w-100 height-75">
								<Nav className="me-auto topmenu">
									<Link onClick={() => setExpanded(false)} className={`nav-link ${(public_path + '/home' === path_url) || (public_path + '/' === path_url) ? "activeLink" : ""}`} to={`${public_path}/home`}>HOME</Link>
									<NavDropdown title="ABOUT US" className="">
										<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/about`}> Company Profile </NavDropdown.Item>
										<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/chairman-s-message`}> Chairman's Message </NavDropdown.Item>
										<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/quality-certification`}> Quality Certification </NavDropdown.Item>
									</NavDropdown>
									<NavDropdownMenu title="OUR PRODUCTS" id="collasible-nav-dropdown" className="multi-dropdown-list" show={show} onToggle={() => setShow(!show)}>
										<NavDropdown.Item className="dropdown-item-my" as={Link} onClick={() => setShow(false)} to={`${public_path}/product`}>All Products</NavDropdown.Item>
										{
											category?.map((row, i) => (
												<React.Fragment key={i}>
													{row?.children?.length === 0 && <NavDropdown.Item className="dropdown-item-my" as={Link} onClick={() => setShow(false)} to={`${public_path}/product/${row?.slug}`}>{row?.name}</NavDropdown.Item>}
													{row?.children?.length > 0 &&
														<DropdownSubmenu href={`#action/2.${i}`} title={row?.name}>
															{row?.children?.map((row2, j) => (
																<React.Fragment key={j}>
																	{row2?.children?.length === 0 && <NavDropdown.Item className="dropdown-item-my" as={Link} onClick={() => setShow(false)} to={`${public_path}/product/${row2?.slug}`}>{row2?.name}</NavDropdown.Item>}
																	{row2?.children?.length > 0 &&
																		<DropdownSubmenu href={`#action/3.${j}`} title={row2?.name}>
																			{row2?.children?.map((row3, k) => (
																				<React.Fragment key={k}>
																					<NavDropdown.Item className="dropdown-item-my" as={Link} onClick={() => setShow(false)} to={`${public_path}/product/${row3?.slug}`}>{row3?.name}</NavDropdown.Item>
																				</React.Fragment>
																			))}
																		</DropdownSubmenu>
																	}
																</React.Fragment>
															))}

														</DropdownSubmenu>
													}
												</React.Fragment>
											))
										}
									</NavDropdownMenu>
									<Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/ailment-vs-remedy' === path_url ? "activeLink" : ""}`} to={`${public_path}/ailment-vs-remedy`}>AILMENT VS REMEDY</Link>
									<Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/about-homoeopathic' === path_url ? "activeLink" : ""}`} to={`${public_path}/about-homoeopathic`}>ABOUT HOMOEOPATHY</Link>
									<Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/paid-consultation' === path_url ? "activeLink" : ""}`} to={`${public_path}/paid-consultation`}>ONLINE CONSULTATION</Link>
									<Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/care-plan' === path_url ? "activeLink" : ""}`} to={`${public_path}/care-plan`}>CARE PLAN</Link>
									{/* <Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/blog' === path_url ? "activeLink" : ""}`} to={`${public_path}/blog`}>BLOG</Link> */}
<<<<<<< HEAD
									<Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/doctor-corner' === path_url ? "activeLink" : ""}`} to={`${public_path}/doctor-corner`}>DOCTOR'S CORNER</Link>
=======
									{/* <Link onClick={() => setExpanded(false)} className={`nav-link ${public_path + '/ailment-vs-remedy' === path_url ? "activeLink" : ""}`} to={`${public_path}/ailment-vs-remedy`}>DOCTOR'S CORNER</Link>y */}
>>>>>>> 764fa75e42258951d6a11d4e6df5a75c94597e65
								</Nav>
								<div className="toplogin navbar-nav d-flex flex-row justify-content-evenly align-items-center searchbar">
									<Link onClick={() => setExpanded(false)} className="topcart d-flex align-items-center nav-link my-0" to={`${public_path}/cart`} >
										<span title="Cart" style={{ width: 25, height: 25, marginRight: 5 }} >
											<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
												<g><path d="M872.3,620.6c-15.8,44.9-57.9,75-104.9,75H325.7c-53,0-98.9-38.3-109.2-91l-74.9-384.1l-24.8-115.2H33.9C20.7,105.3,10,94.5,10,81.2C10,67.8,20.7,57,33.9,57H136c3.8,0.6,5.3,0.9,6.9,1.4c1.4,0.5,2.7,0.9,4,1.7c1.4,0.7,2.6,1.6,3.8,2.6c1.2,1,2.3,2,3.3,3.2c0.9,1.2,1.7,2.4,2.4,3.7c0.8,1.4,1.5,2.9,2,4.5c0.2,0.7,0.7,1.3,0.9,2l24.8,115.3h726.9c25.6,0,49.7,12.6,64.5,33.8c14.8,21.2,18.5,48.5,9.9,73L872.3,620.6z M936.6,253c-5.9-8.5-15.2-13.4-25.5-13.4H194l69.3,355.6c5.9,30.1,32.1,52,62.4,52h441.7c26.9,0,51-17.2,60-42.9l113.1-322.5C944,272.1,942.6,261.5,936.6,253L936.6,253L936.6,253z M308.4,748.1c53.1,0,96.2,43.7,96.2,97.4c0,53.8-43.2,97.5-96.2,97.5c-53,0-96.2-43.7-96.2-97.5C212.2,791.8,255.3,748.1,308.4,748.1L308.4,748.1L308.4,748.1z M308.4,894.7c26.7,0,48.5-22,48.5-49.1c0-27.1-21.8-49.1-48.5-49.1c-26.7,0-48.4,22-48.4,49.1C259.9,872.6,281.6,894.7,308.4,894.7L308.4,894.7L308.4,894.7z M733.5,748.1c53.1,0,96.2,43.7,96.2,97.4c0,53.8-43.1,97.5-96.2,97.5c-53,0-96.2-43.7-96.2-97.5C637.4,791.8,680.5,748.1,733.5,748.1L733.5,748.1L733.5,748.1z M733.5,894.7c26.8,0,48.5-22,48.5-49.1c0-27.1-21.8-49.1-48.5-49.1s-48.5,22-48.5,49.1C685.1,872.6,706.8,894.7,733.5,894.7L733.5,894.7L733.5,894.7z" /></g>
											</svg>

										</span>
										<span>{getCart?.products?.length}</span>
									</Link>
									{id ?
										<>
											<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium active px-3" to={`${public_path}/profile`}>Profile</Link>
											<button className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted px-3" onClick={logout}>Logout</button>
										</>
										:
										<>
											<Dropdown className="topmenu">
												<Dropdown.Toggle className="active btn btn-sm text-decoration-none text-dark" variant="link" id="dropdown-basic"> Login </Dropdown.Toggle>
												<Dropdown.Menu className="p-0">
													<Dropdown.Item className="mx-0 py-1" style={{ height: 'auto' }} as={Link} to={`${public_path}/login`}>Buyer Account</Dropdown.Item>
													<Dropdown.Item className="mx-0 py-1" style={{ height: 'auto' }} target="__blank" href="http://dealerportal.sblglobal.com/" >Dealer Account</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
											<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted px-3" to={`${public_path}/register`}>REGISTER</Link>
										</>
									}
								</div>
							</div>
							<form className="row w-100 mt-3 justify-content-between searchbar" id="product-search-listing" onSubmit={submitSearch}>
								<div className="col-md-8 d-flex my-auto searchbar-wra">
									<div class="input-group">
										<input type="text" class=" topsearch form-control" placeholder="Search for products..." value={query}
											onChange={(e) => { setQuery(e.target.value); onStopTyping(e); }} />
										<button type="search" class="search-buttons" id="header-search-bar"><i class="fa fa-magnifying-glass text-white"></i></button>

										{loading &&
											<div className="d-flex justify-content-center">
												<div class="spinner-border spinner-border-sm" role="status">
													<span class="visually-hidden">Loading...</span>
												</div>
											</div>
										}


										{searchProcess && (products?.products || products?.categories) && !loading &&
											<div className={`search-results ${searchData?.length > 0 ? 'd-block' : ''}`} unselectable="on">
												{products?.categories?.length === 0 && products?.products?.length === 0 && !loading && <p className="d-flex justify-content-center">No record found.</p>}

												{products?.categories?.length > 0 && !loading &&
													<>
														<h6>Categories</h6>
														<div className="search-result-list">
															<ul class="list-unstyled">
																{products?.categories?.map((category: any) => {
																	return (
																		<>
																			<li>
																				<a onClick={handleClick(`/product/${category?.slug}`)} href={`/product/${category?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																					<span className="dgwt-wcas-si">
																						<img src={category?.image} height={60} width={60} alt={`${category?.name}`} />
																					</span><div className="dgwt-wcas-content-wrapp">
																						<div className="dgwt-wcas-st">
																							<span className="dgwt-wcas-st-title"><strong>{category?.name}</strong>
																							</span>
																						</div>
																					</div>
																				</a>
																			</li>
																		</>
																	)
																})}
															</ul>
														</div>
													</>
												}

												{products?.products?.length > 0 && !loading &&
													<>
														<h6>Products</h6>
														<div className="search-result-list">
															<ul class="list-unstyled">
																{products?.products?.map((product: any) => {
																	return (
																		<>
																			<li>
																				<a onClick={handleClick(`/product-details/${product?.slug}`)} href={`/product-details/${product?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																					<span className="dgwt-wcas-si">
																						{product?.image && <img src={product?.image} height={60} width={60} alt={product?.name} />}
																					</span><div className="dgwt-wcas-content-wrapp">
																						<div className="dgwt-wcas-st">
																							<span className="dgwt-wcas-st-title"><strong>{product?.category_name?.length > 0 ? `${product?.name?.replace(/\\|'/g, '')} - ${product?.category_name?.replace(/\\|'/g, '')}` : product?.name?.replace(/\\|'/g, '')}</strong>
																							</span>
																						</div>
																					</div>
																				</a>
																			</li>
																		</>
																	)
																})}
															</ul>
														</div>
													</>
												}
											</div >
										}
									</div>
									{/* <div class="input-group mb-3">
 

								<input
									placeholder="Search for products..."
									aria-label="Search"
									type="search"
									className="me-2 topsearch form-control form-control-sm ps-3"
									value={query}
									onChange={(e) => { setQuery(e.target.value); onStopTyping(e); }}
								/>
								{loading &&
									<div className="d-flex justify-content-center">
										<div class="spinner-border spinner-border-sm" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									</div>
								}


								{searchProcess && (products?.products || products?.categories) && !loading &&
									<div className={`search-results ${searchData?.length > 0 ? 'd-block' : ''}`} unselectable="on">
										{products?.categories?.length === 0 && products?.products?.length === 0 && !loading && <p className="d-flex justify-content-center">No record found.</p>}

										{products?.categories?.length > 0 && !loading &&
											<>
												<h6>Categories</h6>
												<div className="search-result-list">
													<ul class="list-unstyled">
														{products?.categories?.map((category: any) => {
															return (
																<>
																	<li>
																		<a onClick={handleClick(`/product/${category?.slug}`)} href={`/product/${category?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																			<span className="dgwt-wcas-si">
																				<img src={category?.image} height={60} width={60} alt={`${category?.name}`} />
																			</span><div className="dgwt-wcas-content-wrapp">
																				<div className="dgwt-wcas-st">
																					<span className="dgwt-wcas-st-title"><strong>{category?.name}</strong>
																					</span>
																				</div>
																			</div>
																		</a>
																	</li>
																</>
															)
														})}
													</ul>
												</div>
											</>
										}

										{products?.products?.length > 0 && !loading &&
											<>
												<h6>Products</h6>
												<div className="search-result-list">
													<ul class="list-unstyled">
														{products?.products?.map((product: any) => {
															return (
																<>
																	<li>
																		<a onClick={handleClick(`/product-details/${product?.slug}`)} href={`/product-details/${product?.slug}`} className="dgwt-wcas-suggestion dgwt-wcas-suggestion-product dgwt-wcas-suggestion-selected" data-index="0" data-post-id="6938">
																			<span className="dgwt-wcas-si">
																				{product?.image && <img src={product?.image} height={60} width={60} alt={product?.name} />}
																			</span><div className="dgwt-wcas-content-wrapp">
																				<div className="dgwt-wcas-st">
																					<span className="dgwt-wcas-st-title"><strong>{product?.category_name?.length > 0 ? `${product?.name?.replace(/\\|'/g, '')} - ${product?.category_name?.replace(/\\|'/g, '')}` : product?.name?.replace(/\\|'/g, '')}</strong>
																					</span>
																				</div>
																			</div>
																		</a>
																	</li>
																</>
															)
														})}
													</ul>
												</div>
											</>
										}
									</div >
								}
								<span className="">
									<button onClick={submitSearch} type="button" className="search-button btn btn-primary">Search</button>
								</span>
							</div> */}
								</div>

								<div className="col-md-4 d-flex my-auto justify-content-end">
									{/* <Dropdown className="d-inline">
								<Dropdown.Toggle variant="outline-secondary topsearch  form-control" className="small translate">
									{filter}
								</Dropdown.Toggle>
								<Dropdown.Menu className="py-0">
									<div className="currency-block">
										<div className="">
											<p className="mb-1 fs-7">Select Currency</p>
											<Select
												classNamePrefix='react-select-small'
												options={currencyList}
												label="Select Currency"
												isClearable
												getOptionLabel={(option) => strLimit(`(${option?.currency_code}) ${option?.currency_name}`, 25)}
												getOptionValue={(option) => option.currency_code}
												onChange={(value) => {
													localStorage.setItem('currency_code', value?.currency_code)
													setFilter(prev => ({ ...prev, currency_code: value?.currency_code }))
													setMyCurrency(value);
													window.location.reload()
												}}
											/>
										</div>
									</div>
								</Dropdown.Menu>
							</Dropdown> */}
									<div className="header-social-icon">
										<ul class="list-inline">
											<li class="list-inline-item">
												<a href="https://www.facebook.com/sblgroupindia" target="_blank" rel="noreferrer">
													<img src={FacebookIcon} alt="Location" width="20" height="22" />
												</a></li>

											<li class="list-inline-item">
												<a href="https://www.instagram.com/sblgroupindia" target="_blank" rel="noreferrer">
													<img src={InstagramIcon} alt="Location" width="20" height="22" />
												</a>
											</li>

											<li class="list-inline-item">
												<a href="https://x.com/sblgroupindia" target="_blank" rel="noreferrer">


													<img src={TwitterIcon} alt="Location" width="20" height="22" /></a></li>

											<li class="list-inline-item">
												<a href="https://www.youtube.com/channel/UCPJhHlXQE0cnP0P7qDF5n3w" target="_blank" rel="noreferrer"><img src={Youtube} alt="Location" width="20" height="22" /></a></li>

											<li class="list-inline-item"><a href="https://in.linkedin.com/company/sbl-private-limited?trk=public_profile_topcard-current-company" target="_blank" rel="noreferrer">
												<img src={Linkdin} alt="Location" width="20" height="22" /></a></li>
										</ul>
										<a href={whatsapp_link} rel="noreferrer" target="_blank">
											<i className="fab fa-whatsapp me-0 ms-2" />
										</a>
									</div>
								</div>

							</form>


						</Navbar.Collapse >
					</Container >
					<div className="d-flex align-items-center my-ico d-block d-lg-none flex-column gap-2">

						<a href={whatsapp_link} rel="noreferrer" target="_blank">
							<i className="fab fa-whatsapp me-0" />
						</a>
					</div>
				</Navbar >
			</header>
		</>
	);
};

export default memo(Header);

// {row3?.children?.length === 0 && <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to={`${public_path}/product/${row3?.slug}`}>{row3?.name}</NavDropdown.Item>}
// {row3?.children?.length > 0 &&
// 	<DropdownSubmenu href={`#action/4.${k}`} title={row3?.name}>
// 		{row3?.children?.map((row4, l) => (
// 			<NavDropdown.Item key={l} as={Link} onClick={() => setExpanded(false)} to={`${public_path}/product/${row4?.slug}`}>{row4?.name}</NavDropdown.Item>
// 		))}
// 	</DropdownSubmenu>
// }
