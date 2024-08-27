import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SubHeader from '../../Components/SubHeader'
import AxiosHelper from "../../helper/AxiosHelper";
import MetaTags from '../../Components/MetaTags';

const ReturnsExchanges = () => {

    const [data, setData] = useState({
        image: undefined,
        cms_contant: "",
        name: "",
        certified: ""
    })

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("cms/18");
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
            <MetaTags data={{ title: data?.name }} />
            <SubHeader heading={data?.name} backgroundImage={data?.image} />
            <div className="container">
                <div className='p-3' dangerouslySetInnerHTML={{ __html: data?.cms_contant }}></div>
                <div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
            </div>
        </>
    )
}

export default ReturnsExchanges