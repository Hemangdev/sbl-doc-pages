import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SubHeader from "../../Components/SubHeader";
import AxiosHelper from "../../helper/AxiosHelper";
import MetaTags from "../../Components/MetaTags";

const ChairmanMessage = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("/cms/4");
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
            <MetaTags data={{ title: data.name }} />
            <SubHeader heading={data?.name} backgroundImage={data?.image} />
            <div className="container">
                <div className="my-3" dangerouslySetInnerHTML={{ __html: data?.cms_contant }}></div>
            </div>

            <BoardOfDirectors />

            <div className='container-fluid' style={{ backgroundColor: "#EFFFE4", paddingTop: "2rem", paddingBottom: "2rem" }}>
                <div className='container' dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
            </div>
        </>
    )
}

const BoardOfDirectors = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("/team");
            if (data.status === true) {
                setData(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);


    return (
        <div className="board mt-5" style={{ minHeight: 500 }}>
            <div className="abutimagescat">
                <h2 className="text-white text-uppercase text-center"> Board of directors </h2>
                <div className="container">
                    <div className="row mt-3">
                        {data?.map((item, i) => (
                            <div className="col-md-3 mt-2" key={i}>
                                <div className="bg-white p-4 border-blue">
                                    <img src={item?.image} height={200} alt="" className="w-100" />
                                </div>
                                <div className="bg-white py-2 px-3 border border-success border-1">
                                    <h5 className="text-blue">{item?.name}</h5>
                                    <span className="text-green">{item?.designation}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChairmanMessage;