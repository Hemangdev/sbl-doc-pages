import React, { memo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap"
import useCart from "../../Hooks/useCart";
import useProfile from "../../Hooks/useProfile";
import useSetting from "../../Hooks/useSetting";
import Select from 'react-select'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { strLimit } from "../../helper/StringHelper";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useEffect } from "react";
import AxiosHelper from "../../helper/AxiosHelper";
const MySwal = withReactContent(Swal)
const public_path = process.env.REACT_APP_PUBLIC_URL
const currency_code = localStorage.getItem('currency_code')

const Header = (props) => {

	const { id } = useProfile();
	const { getCart } = useCart()
	const [expanded, setExpanded] = useState(false);
	const [category, setCategory] = useState([])
	const [filter, setFilter] = useState(currency_code ? currency_code : "INR")
	const { path, logo, facebook_link, whatsapp_link, application_name, currencyList, setMyCurrency } = useSetting()
	const navigate = useNavigate();
	const [show, setShowChange] = useState(false)
	const [searchParams] = useSearchParams();
	const search = searchParams.get('query')
	const [query, setQuery] = useState(search ? search : "")

	const submitSearch = (e) => {
		e.preventDefault()
		setExpanded(false)
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

	useEffect(() => {
		(async () => {
			var { data } = await AxiosHelper.getData(`category`);
			if (data.status === true) {
				setCategory(data?.data?.categories)
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

	return (
		<Navbar bg="light" expand="lg" expanded={expanded}>
			<Container fluid className="align-items-start border-end header-padding">
				<Navbar.Brand as={Link} to={`${public_path}/home`}>
					<img src={path + logo} alt={application_name} className="d-inline-block align-top d-none d-lg-block" height={130} max-width={100} />
					<span className="ms-1 fw-bold text-uppercase text-success d-md-block d-lg-none">{application_name}</span>
				</Navbar.Brand>

				<button className="navbar-toggler shadow-none p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#MainemenuMoblie">
				
					<input type="checkbox" id="hamburger" />
					<label htmlFor="hamburger" className="hamburger">
						<span className="line"></span>
						<span className="line"></span>
						<span className="line"></span>
					</label>
				</button>
				<Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
				<Navbar.Collapse className="flex-column">
					<div className="border-bottom d-md-block d-lg-flex w-100 height-75">
						<Nav className="me-auto topmenu">
							<Link onClick={() => setExpanded(false)} className={`nav-link ${(public_path + '/home' === path_url) || (public_path + '/' === path_url) ? "activeLink" : ""}`} to={`${public_path}/home`}>HOME</Link>
							<NavDropdown title="ABOUT US" className="">
								<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/about`}> Company Profile </NavDropdown.Item>
								<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/chairman-s-message`}> Chairman's Message </NavDropdown.Item>
								<NavDropdown.Item onClick={() => setExpanded(false)} className="mx-0 py-1" style={{ height: 'auto', borderBottom: '1.5px solid transparent' }} as={Link} to={`${public_path}/quality-certification`}> Quality Certification </NavDropdown.Item>
							</NavDropdown>
							<NavDropdownMenu title="OUR PRODUCTS" id="collasible-nav-dropdown" className="multi-dropdown-list" show={show} onToggle={() => setShow(!show)}>
								<NavDropdown.Item className="dropdown-item-my" as={Link} onClick={() => setShow(false)} to={`${public_path}/product`}>All PRODUCTS</NavDropdown.Item>
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
						</Nav>
						<div className="toplogin navbar-nav d-flex flex-row justify-content-evenly align-items-center">
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
									<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium active" to={`${public_path}/profile`}>Profile</Link>
									<button className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted" onClick={logout}>Logout</button>
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
									<Link onClick={() => setExpanded(false)} className="btn btn-sm nav-link-btn btn-link text-decoration-none text-dark fw-medium text-muted" to={`${public_path}/register`}>REGISTER</Link>
								</>

							}
						</div>
					</div>
					<form className="row w-100 justify-content-between" onSubmit={submitSearch}>
						<div className="col-md-8 d-flex mt-3">
							<input placeholder="Search..."
								aria-label="Search" type="search"
								className="me-2 topsearch form-control form-control-sm ps-3"
								value={query}
								onChange={e => setQuery(e.target.value)} />
							<span className="">
								<button onClick={submitSearch} type="button" className="search-button btn btn-primary">Search</button>
							</span>
						</div>

						<div className="col-md-3 d-flex mt-3 justify-content-between">
							<Dropdown className="d-inline">
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
							</Dropdown>
							<div className="d-flex align-items-center">
								<a href={facebook_link} rel="noreferrer" target="_blank">
									<i className="fab fa-facebook me-0 ms-2" />
								</a>
								<a href={whatsapp_link} rel="noreferrer" target="_blank">
									<i className="fab fa-whatsapp me-0 ms-2" />
								</a>
							</div>
						</div>
					</form>
				</Navbar.Collapse>
			</Container>
		</Navbar >

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
