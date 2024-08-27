import React from 'react'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SubHeader from '../Components/SubHeader'
import AxiosHelper from '../helper/AxiosHelper';
import InstaFollow from "../Components/InstaFollow";
import MetaTags from '../Components/MetaTags';

const QualityCertification = () => {

    const [data, setData] = useState({
        cms_detail: {
            slug: "",
            cms_group: "",
            name: "",
            cms_title: "",
            cms_contant: "",
            image: "https://3.110.22.232/admin/public/images/logo.png",
        },
        cms: [],
        certified: ""
    })

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("quality_certification");
            if (data.status === true) {

                setData(data.data)
            } else {
                toast.error(data.message);
            }
        })();
    }, []);

    return (
        <>
            <MetaTags data={{title: data?.cms_detail?.cms_group}} />
            <SubHeader heading={data?.cms_detail?.cms_group} ></SubHeader>

            <div className="container quality">
                {data?.cms?.map(item => (
                    <div dangerouslySetInnerHTML={{ __html: item }}></div>
                ))}
            </div>

            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
            </div>

            <InstaFollow />
        </>
    )
}

export default QualityCertification