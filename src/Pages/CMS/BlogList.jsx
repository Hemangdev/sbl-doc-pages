import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SubHeader from '../../Components/SubHeader'
import AxiosHelper from "../../helper/AxiosHelper";
import { formatDateDDMMYYYY } from "../../helper/StringHelper";
import MetaTags from "../../Components/MetaTags";

const BlogList = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [data, setData] = useState([])
    const [pageCurrent, setPageCurrent] = useState(1)
    const [pageMax, setPageMax] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                var { data } = await AxiosHelper.getData(`blog?limit=10&page=${pageCurrent}`);
                if (data.status === true) {
                    setPageMax(data?.total)
                    setData(data.data)
                }
                else {
                    toast.error(data.message);
                }
            })();
        }, 500)
    }, [pageCurrent]);

    const switchNext = () => {
        if (pageCurrent <= pageMax) {
            setPageCurrent(pageCurrent + 1)
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set('page', String(pageCurrent + 1));

            const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
            window.history.replaceState(null, null, newUrl);
        }
    }

    const switchPrev = () => {
        if (pageCurrent >= 1) {
            setPageCurrent(pageCurrent - 1)
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set('page', String(pageCurrent - 1));
            const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
            window.history.replaceState(null, null, newUrl);
        }
    }

    useEffect(() => {
        setPageCurrent(parseInt(searchParams.get('page')) ? parseInt(searchParams.get('page')) : 1)
    }, [])

    return (
        <>
            <MetaTags data={{ title: 'Blogs' }} />
            <SubHeader heading="Blogs" />
            <div className="container">
                <div className="row">
                    <div className="card my-4">
                        <div className="card-body">
                            <div className="row">
                                {data?.map((item, i) => (
                                    <div className="col-md-12 py-2 border-bottom" key={item?.id}>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <Link to={`/blogs/${item?.seo_url}`} >
                                                    <img src={item?.image} alt="thumb" className="img-thumbnail news-image" />
                                                </Link>
                                            </div>
                                            <div className="col-sm-9">
                                                <div className="d-flex align-items-between flex-column mb-0 h-100">
                                                    <h4 className="mb-2 font-weight-600 text-primary">
                                                        <Link className="text-decoration-none" to={`/blogs/${item?.seo_url}`} >
                                                            {item?.title}
                                                        </Link>
                                                    </h4>
                                                    <p className="mb-0 text-justify"> {item?.sort_description} </p>
                                                    <div className="d-flex justify-content-between mt-auto mb-1">
                                                        <small className="text-dark">
                                                            By : <b>{item?.post_by}</b>
                                                        </small>
                                                        <small className="text-muted">
                                                            <i className="fa fa-calendar"></i> {formatDateDDMMYYYY(item?.created_at)}
                                                        </small>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 text-center">
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
                </div>
            </div>
        </>
    )
}

export default BlogList
