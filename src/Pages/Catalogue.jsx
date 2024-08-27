import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SubHeader from '../Components/SubHeader'
import AxiosHelper from "../helper/AxiosHelper";
import MetaTags from "../Components/MetaTags";

const Catalogue = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`catalogs`);
            if (data.status === true) {
                setData(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);

    return (
        <>
            <MetaTags data={{ title: 'Download Catalogue' }} />
            <SubHeader heading="Download Catalogue" />
            <div className="container">
                <div className="row py-5">
                    <div className="col-md-12">

                    </div>
                    {data?.map((item, i) => (
                        <div className="col-md-4" key={item?.id}>
                            <div className="card my-4">
                                <div className="card-body">
                                    <div className="row">
                                        <img src={item?.image} className="img-fluid rounded-top" alt="" style={{ height: 300 }} />
                                    </div>
                                    <div className="pt-3 ">
                                        <div className="w-100 text-center">
                                            <h5 className="text-secondary"> {item?.name} </h5>
                                            <a className="btn btn-block btn-success my-2" href={item?.catalog_link} target="__blank">
                                                <i className="fa fa-download me-2"></i>Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Catalogue