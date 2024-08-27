import SubHeader from "../Components/SubHeader";
import Service from "../Components/Service";
import InstaFollow from "../Components/InstaFollow";
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AxiosHelper from "../helper/AxiosHelper";
import MetaTags from "../Components/MetaTags";

const AboutHomoeopathic = () => {
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
    certified: "",
    instafeed: []
  })

  useEffect(() => {
    (async () => {
      var { data } = await AxiosHelper.getData("abouthomeopathy");
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
      <MetaTags data={{ title: data?.cms_detail?.cms_group }} />

      <SubHeader heading={data?.cms_detail?.cms_group} backgroundImage={data?.cms_detail?.image} />
      <div className="bgwhite py-5 container-fluid">
        {
          data?.cms?.map((item, i) => (
            <div key={i} className="container mb-5" dangerouslySetInnerHTML={{ __html: item }}></div>
          ))
        }
      </div>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
      </div>

      <InstaFollow />
      <Service feeds={data?.instafeed} />
    </>
  );
};

export default AboutHomoeopathic;
