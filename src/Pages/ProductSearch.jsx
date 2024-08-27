import { } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import SubHeader from "../Components/SubHeader";
import AxiosHelper from "../helper/AxiosHelper";
import { Row, Col, Form } from "react-bootstrap";
import ProductBox from "../Components/include/Products/ProductBox";
import CaregorySideMenu from '../Components/include/Products/CaregorySideMenu';
import { hideLoader, scrollToTop, showLoader } from '../helper/LoaderHelper';

const ProductSearch = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('query')
  const [data, setData] = useState([])
  const [sortSelect, setSortSelect] = useState("")
  const [pageCurrent, setPageCurrent] = useState(1)
  const [notVaitable, setNotVaitable] = useState(false)
  const [pageMax, setPageMax] = useState(1)

  const ini = {
    limit: 9,
    page: 1,
    search: search,
    orderBy: 'products.sort_order',
    sort_order: "asc",
  }

  const [param, setParam] = useState(ini)
  useEffect(() => {
    setParam(prev => ({ ...prev, search: search }))
  }, [search])

  useEffect(() => {
    showLoader()
    setTimeout(() => {
      (async () => {
        const { data } = await AxiosHelper.getData("productlists", param);
        if (data.status === true) {
          let { products, total } = data.data
          if (data.data.total === 0) {
            setNotVaitable(true)
          }
          else {
            setNotVaitable(false)
          }
          setPageMax(total)
          setData(products)
          scrollToTop()
          hideLoader()
        }
        else {
          toast.error(data.message);
        }
      })()
    }, 500)

  }, [param])

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

  useEffect(() => {
    setParam(prevState => ({
      ...prevState,
      page: (searchParams.get('page')) ? parseInt(searchParams.get('page')) : 1,
    }))
    if ((searchParams.get('page'))) {
      setPageCurrent(parseInt(searchParams.get('page')))
    }
  }, [])

  return (
    <>
      <SubHeader heading="Search Item" />
      <div className="bg-white p-4">
        <Row>
          <Col lg={{ span: 9, order: 1 }}>
            <div className="container-lg">
              <Row>
                <Col md="12">
                  <div className="d-flex justify-content-between py-4">
                    <div className="col-sm-auto mb-2 mb-sm-0 d-flex align-items-center">
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
                    <div className='col-md-4 d-flex justify-content-end align-items-center'>
                      <h6 className="mb-0 me-2">Sort</h6>
                      <div>
                        <Form.Select size="sm" value={sortSelect} onChange={handelSort}>
                          <option value="">Default</option>
                          <option value="2">Price : High To Low</option>
                          <option value="3">Price : Low To High</option>
                        </Form.Select>
                      </div>
                      <button onClick={() => {
                        setSortSelect("")
                        setParam(ini)
                      }} className='btn btn-sm btn-outline-secondary px-2 py-1 ms-2 text-dark'><i className="fa fa-refresh"></i></button>
                    </div>
                  </div>
                </Col>
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
                        <li className={`page-item ${pageCurrent === 1 && "disabled"}`}>
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

export default ProductSearch