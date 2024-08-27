import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SubHeader from '../Components/SubHeader'
import AxiosHelper from "../helper/AxiosHelper";
import { formatDateDDMMYYYY, strLimit } from "../helper/StringHelper";
import MetaTags from "../Components/MetaTags";

const NewsDetails = () => {

    const { slug } = useParams()
    const [dataList, setDataList] = useState([])
    const [data, setData] = useState({
        id: 1,
        title: "",
        sort_description: "",
        image: "",
        post_by: "",
        seo_url: "",
        description: "",
        created_at: ""
    })

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`news?limit=5&page=1`);
            if (data.status === true) {
                setDataList(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`news/${slug}`);
            if (data.status === true) {
                setData(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, [slug]);

    return (
        <>
            <MetaTags data={{ title: 'News Details' }} />
            <SubHeader heading="News Details" />
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card my-4">
                            <div className="card-body">
                                <div className="row">
                                    <img src={data?.image} className="img-fluid rounded-top" alt="" style={{ maxHeight: 350 }} />
                                </div>
                                <div className="border-bottom py-3 ">
                                    <h4 className="text-primary"> {data?.name} </h4>
                                    <div className="d-flex justify-content-between">
                                        <small className="text-dark">

                                        </small>
                                        <small className="text-muted">
                                            <i className="fa fa-calendar"></i> {formatDateDDMMYYYY(data?.publish_date)}
                                        </small>
                                    </div>
                                </div>
                                <div className="py-4 text-justify" dangerouslySetInnerHTML={{ __html: data?.message }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card my-4">
                            <div className="card-body">
                                <h4 className="border-bottom pb-2"> Latest News </h4>
                                <div className="row">
                                    {dataList?.map((item, i) => (
                                        <div className="col-md-12 my-2" key={item?.id}>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <Link to={`/news/${item?.slug}`} >
                                                        <img src={item?.image} alt="thumb" className="img-thumbnail news-image-small" />
                                                    </Link>
                                                </div>
                                                <div className="col-sm-8">
                                                    <h6 className="mb-2 font-weight-400 text-primary">
                                                        <Link className="text-decoration-none" to={`/news/${item?.slug}`} >
                                                            {strLimit(item?.name, 50)}
                                                        </Link>
                                                    </h6>
                                                    <p className="mb-1 text-justify small">
                                                        {strLimit(item?.message, 80)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default NewsDetails