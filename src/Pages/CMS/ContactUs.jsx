import { toast } from 'react-toastify'
import SubHeader from "../../Components/SubHeader";
import Service from "../../Components/Service";
import InstaFollow from "../../Components/InstaFollow";
import ContactForm from "../../Components/ContactForm";
import { CompanyLocations } from "../About";
import AxiosHelper from "../../helper/AxiosHelper";
import { useEffect } from "react";
import { useState } from "react";
import MetaTags from '../../Components/MetaTags';

const ContactUs = () => {

    const [data, setData] = useState({
        cms_detail: {
            cms_group: "",
            name: "",
            cms_title: "",
            meta_title: "",
            meta_keyword: "",
            meta_description: "",
            cms_contant: "",
            image: "",
        },
        cms: [],
        company: [],
        certified: "",
        instafeed: []
    })
    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("aboutcompany");
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
            <MetaTags data={{ title: 'Contact Us' }} />
            <SubHeader heading="Contact Us" />
            <ContactForm />
            <CompanyLocations company={data?.company} />

            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
            </div>

            <InstaFollow />
            <Service feeds={data?.instafeed} />
        </>
    )
}

export default ContactUs;