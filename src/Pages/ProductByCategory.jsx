import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import AxiosHelper from "../helper/AxiosHelper";
import { Row, Col, Form } from "react-bootstrap";
import ProductBox from "../Components/include/Products/ProductBox";
import CaregorySideMenu from "../Components/include/Products/CaregorySideMenu";
import { hideLoader, scrollToTop, showLoader } from "../helper/LoaderHelper";
import { alphabet } from "../helper/StringHelper";
import MetaTags from "../Components/MetaTags";
const public_path = process.env.REACT_APP_PUBLIC_URL

const ProductByCategory = () => {

	const { slug } = useParams()
	const navigate = useNavigate()
	const location = useLocation();
	const [data, setData] = useState([])
	const searchParams = new URLSearchParams(location.search);
	const [pageCurrent, setPageCurrent] = useState(1);
	const [pageMax, setPageMax] = useState(1)
	const [sortSelect, setSortSelect] = useState("")
	const [notVaitable, setNotVaitable] = useState(false)
	const [category, setCategory] = useState({
		name: ""
	})

	const [param, setParam] = useState({
		limit: 9,
		page: searchParams?.get('page') ? parseInt(searchParams.get('page')) : 1,
		search: "",
		alphasort: (searchParams.get('title')),
		orderBy: 'products.sort_order',
		sort_order: "asc",
		catlist: slug
	})

	const filterShow = location?.pathname.includes('mother-tinctures') || location?.pathname.includes('triturations-tablets') || location?.pathname.includes('dilutions')

	const getData = useCallback(() => {
		showLoader()
		setData([])
		setTimeout(async () => {
			const { data } = await AxiosHelper.getData("productlists", param);
			if (data.status === true) {
				let { category, products, total } = data.data
				if (data?.data?.total === 0) {
					setNotVaitable(true)
				} else {
					setNotVaitable(false)
				}

				if (category) {
					setCategory(category)
				} else {
					toast.error('Invalid category.')
					navigate(`${public_path}/product`)
				}
				setPageMax(total)
				setData(products)
				scrollToTop()
				hideLoader()
			} else { toast.error(data.message); }
		}, 500)
	}, [param])

	useEffect(() => {
		getData()
	}, [getData])

	useEffect(() => {
		setParam(prev => ({
			...prev,
			limit: 9,
			page: searchParams?.get('page') ? parseInt(searchParams.get('page')) : 1,
			search: "",
			alphasort: null,
			catlist: slug
		}))
	}, [slug])


	const switchNext = () => {
		if (pageCurrent <= pageMax) {
			setParam(prev => ({ ...prev, page: prev.page + 1 }));
			setPageCurrent(pageCurrent + 1);

			const queryParams = new URLSearchParams(window.location.search);
			queryParams.set('page', String(pageCurrent + 1));

			const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
			window.history.replaceState(null, null, newUrl);
		}
	}


	const switchPrev = () => {
		if (pageCurrent >= 1) {
			if (pageCurrent === 1) {
				const queryParams = new URLSearchParams(window.location.search);
				queryParams.delete('page');
				const newUrl = `${window.location.pathname}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
				window.history.replaceState(null, null, newUrl);
				setParam(prev => ({ ...prev, page: 1 }))
				setPageCurrent(1)
			} else {
				setParam(prev => ({ ...prev, page: prev.page - 1 }))
				setPageCurrent(pageCurrent - 1)
				const queryParams = new URLSearchParams(window.location.search);
				queryParams.set('page', String(pageCurrent - 1));
				const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
				window.history.replaceState(null, null, newUrl);
			}
		}
	}

	const handelSort = (e) => {
		setSortSelect(e.target.value)
		switch (parseInt(e.target.value)) {
			case 1:
				setParam(prev => ({ ...prev, orderBy: 'created_at', sort_order: "desc" }))
				break;

			case 2:
				setParam(prev => ({ ...prev, orderBy: 'price', sort_order: "desc" }))
				break;

			case 3:
				setParam(prev => ({ ...prev, orderBy: 'price', sort_order: "asc" }))
				break;

			default:
				setParam(prev => ({ ...prev, orderBy: 'products.sort_order', sort_order: "asc" }))
				break;
		}
	}

	const setAlphaSort = (item) => {
		const titleParam = item !== null ? item.toLowerCase() : undefined;
		const queryParams = new URLSearchParams(window.location.search);

		if (titleParam !== undefined) {
			queryParams.set('title', titleParam);
		} else {
			queryParams.delete('title');
		}

		const queryString = queryParams.toString();
		const newUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;
		window.history.replaceState(null, null, newUrl);
		setParam(prev => ({ ...prev, alphasort: item ? item : null }));
	}

	useEffect(() => {
		if(searchParams?.get('page')){
			setParam(prevState => ({
				...prevState,
				page: (searchParams.get('page')) ? parseInt(searchParams.get('page')) : 1,
				alphasort: (searchParams.get('title'))
			}))
		}
		if ((searchParams.get('page'))) {
			setPageCurrent(parseInt(searchParams.get('page')))
		}
	}, [])

	return (
		<>
			<MetaTags data={{ title: category?.meta_title?.length > 0 ? category.meta_title : category?.name }} />
			<SubHeader heading={category?.name} />
			<div className="container-fluid bg-white p-4">
				<Row className="pt-4">
					<Col lg={{ span: 9, order: 1 }} >
						<div className="container-lg">
							<Row className="justify-content-between">
								<div className="col-sm-5 d-flex align-items-center">
									<h6 className="mb-0 me-2">Per Page Items</h6>
									<select className="w-auto form-select form-select-sm me-2" value={param.limit}
										onChange={(e) => {
											setParam(prev => ({ ...prev, limit: e.target.value, page: 1 }))
											setPageCurrent(1)
										}}
									>
										<option value={8}>8</option>
										<option value={16}>16</option>
										<option value={24}>24</option>
									</select>
								</div>
								<div className='col-sm-4 d-flex align-items-center'>
									<h6 className='mb-0 me-2'>Sort</h6>
									<Form.Select size="sm" value={sortSelect} onChange={handelSort}>
										<option value="">Default</option>
										<option value="2">Price : High To Low</option>
										<option value="3">Price : Low To High</option>
									</Form.Select>
									<button onClick={() => {
										setSortSelect('')
										setParam({
											limit: 9,
											page: 1,
											search: "",
											alphasort: null,
											orderBy: 'products.sort_order',
											sort_order: "asc",
											catlist: slug
										})
									}} className='btn btn-sm btn-outline-secondary px-2 py-1 ms-2 text-dark'><i className="fa fa-refresh"></i></button>
								</div>
								{filterShow &&
									<div className="col-md-12 pt-3 d-flex flex-wrap">
										<span className="fw-bold me-2">Filter By : </span>
										<span onClick={() => setAlphaSort(null)} role="button" href="!#" className={`mx-1 text-decoration-underline ${param.alphasort === null ? 'text-danger fw-bold' : 'text-green'}`}>All</span>
										{alphabet.map((item, i) => <span key={i} onClick={() => setAlphaSort(item)} role="button" href="!#" className={`mx-1 text-decoration-underline ${param.alphasort === item || param?.alphasort === (item).toLocaleLowerCase() ? 'text-danger fw-bold' : 'text-green'}`}>{item}</span>)}
									</div>
								}
							</Row>
							<Row className="mt-4">
								{data?.map((item, key) => (
									<Col md={4} sm={6} key={key} className="pb-2">
										<ProductBox item={item} key={key} />
									</Col>
								))}
								{data.length === 0 && notVaitable && <h5 className='text-danger text-center'>No product found.</h5>}
								<Col md={12} className="py-3">
									<div className="container text-center">
										<nav >
											<ul className="pagination d-flex justify-content-between">
												<li className={`page-item ${param?.page === 1 && "disabled"}`}>
													<button className="page-link" onClick={switchPrev}><i className="fa fa-arrow-left me-1"></i>Previous </button>
												</li>
												<li className={`page-item ${pageCurrent >= pageMax && "disabled"}`}>
													<button className="page-link" onClick={switchNext}>Next <i className="fa fa-arrow-right ms-1"></i></button>
												</li>
											</ul>
										</nav>
									</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col lg={{ span: 3, order: 0 }}>
						<CaregorySideMenu />
					</Col>
				</Row>
			</div>
		</>
	)
}

export default ProductByCategory