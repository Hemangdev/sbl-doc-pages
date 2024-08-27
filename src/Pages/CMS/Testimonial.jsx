
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SubHeader from "../../Components/SubHeader";
import AxiosHelper from "../../helper/AxiosHelper";
import { strLimit } from "../../helper/StringHelper";
import MetaTags from "../../Components/MetaTags";

const Testimonial = () => {

    const [data, setData] = useState([])
    const [pageCurrent, setPageCurrent] = useState(1)
    const [pageMax, setPageMax] = useState(1)


    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`testimonials?limit=9&page=${pageCurrent}`);
            if (data.status === true) {
                setPageMax(data?.total)
                setData(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, [pageCurrent]);

    const switchNext = () => {
        if (pageCurrent <= pageMax) {
            setPageCurrent(pageCurrent + 1)
        }
    }

    const switchPrev = () => {
        if (pageCurrent >= 1) {
            setPageCurrent(pageCurrent - 1)
        }
    }


    return (
        <>
            <MetaTags data={{ title: 'Testimonial' }} />
            <SubHeader heading="Testimonial" />
            <div className="container">
                <div className="row">
                    <div className="card my-4">
                        <div className="card-body">
                            <div className="text-center">
                                <h4 className="fw-bold border-bottom pb-3">What Saying Our Customers</h4>
                            </div>
                            <div className="row custom-testimonial my-5">
                                {data?.map((item, i) => (
                                    <div className="col-md-4 mb-3" key={item?.id}>
                                        <div className="card shadow-lg">
                                            <div className="face front-face">
                                                <img src={item?.image} alt="" className="profile img-thumbnail" />
                                                <div className="pt-3 text-uppercase text-primary fw-bold">
                                                    {item?.name}
                                                </div>
                                                <div className="text-muted">{item?.designation}</div>
                                            </div>
                                            <div className="face back-face text-muted d-flex flex-column">
                                                <span className="fas fa-quote-left w-100 text-left" />
                                                <div className="text-muted text-justify testimonial-text">
                                                    {strLimit(item?.message, 550)}
                                                </div>
                                                <span className="fas fa-quote-right w-100 text-right" />
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

export default Testimonial