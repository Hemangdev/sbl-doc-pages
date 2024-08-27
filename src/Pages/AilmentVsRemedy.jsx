import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AxiosHelper from "../helper/AxiosHelper";
import SubHeader from "../Components/SubHeader";
import Service from "../Components/Service";
import InstaFollow from "../Components/InstaFollow";
import { Container, Row, Table, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MetaTags from '../Components/MetaTags';

const public_path = process.env.REACT_APP_PUBLIC_URL

const AilmentVsRemedy = () => {

  const [search, setSearch] = useState('')
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

  const [list, setList] = useState([])

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


  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosHelper.getData(`category`);
        if (data.status === true) {
          if (data?.data?.categories) {
            const filteredList = data?.data?.categories?.find((item) => item.slug === 'personal-care');

            setList(filteredList);
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <>
      <MetaTags data={{ title: 'Ailment Vs Remedy' }} />
      <SubHeader heading="Ailment Vs Remedy" />

      <Container fluid className="pt-5 bgwhite">
        {/* <Container className="">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="bold themefont">
							Search Ailment Or Remedy By Entering Keywords Below
						</h3>
						<div className="w-60 p-4">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
								<button onClick={e => setSearch('')} type="button" className="btn bg-transparent" style={{ marginLeft: '-40px', zIndex: 100 }}>
									<i className="fa fa-times"></i>
								</button>
							</div>
						</div>
					</Row>
					<Row className="my-3">
						<Table hover responsive >
							<thead className="bgtheme ">
								<tr>
									<th max-width="300" className="p-3 text-center border border-2 border-green">Ailment</th>
									<th colSpan={2} className="p-3 text-center border border-2 border-green">Remedy</th>
								</tr>
							</thead>
							<tbody>
								{list.map((item, i) => (
									<tr key={i}>
										<td className="themeborder p-4">{item?.ailment_name}</td>
										<td className="p-0 themeborder">
											{item?.remedy_tablets?.map((row, j) => (
												<Col className='p-1 border-bottom border-success' md={12} key={j} >
													<div className="d-flex align-items-center">
														<img src={row?.image} alt="" width={80} height={68} />
														<Link to={`${public_path}/product-details/${row?.slug}`} className="ms-3 text-blue fw-bold text-decoration-none"> {row?.name}</Link>
													</div>
												</Col>
											))}
										</td>
										<td className="p-0 themeborder">
											{item?.remedy_syrup?.map((row, j) => (
												<Col className='p-1 border-bottom border-success' md={12} key={j}>
													<div className="d-flex align-items-center">
														<img src={row?.image} alt="" width={80} height={68} />
														<Link to={`${public_path}/product-details/${row?.slug}`} className="ms-3 text-blue fw-bold text-decoration-none"> {row?.name}</Link>
													</div>
												</Col>
											))}
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						{list.length <= 0 && <div className='text-danger text-center p-2'>No Record found..</div>}
					</Row>
				</Container> */}
        <section className="bady-care-card">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
              {list?.children?.map((item, i) => {
                return (
                  <div className="col" key={i}>
                    <Link to={`${public_path}/product/${item?.slug}`} className="text-decoration-none text-dark">
                      <div className="card">
                        <Image src={item.image} alt='' width={200} height={120} className="card-img-top" />
                        <div className="card-body">
                          <h5>
                            {item?.name}
                          </h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
              }

            </div>
          </div>
        </section>
      </Container>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: data?.certified }}></div>
      </div>
      <InstaFollow />
      <Service feeds={data?.instafeed} />
    </>
  );
};

export default AilmentVsRemedy;
