
import { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap"
import { toast } from "react-toastify";
import SubHeader from "../../Components/SubHeader";
import AxiosHelper from "../../helper/AxiosHelper";
import MetaTags from "../../Components/MetaTags";

const FAQ = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("faq");
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
            <MetaTags data={{ title: 'FAQs and Help' }} />
            <SubHeader heading="FAQs and Help" />
            <div className="container my-5">
                <Accordion>
                    {data?.map((item, i) => (
                        <Accordion.Item eventKey={i} key={i}>
                            <Accordion.Header><span className="fw-bolder text-primary">{item?.question}</span></Accordion.Header>
                            <Accordion.Body>
                                <p className="text-muted" dangerouslySetInnerHTML={{ __html: item?.answer }}></p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </>
    )
}


export default FAQ;