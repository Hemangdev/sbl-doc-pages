import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import AxiosHelper from "../helper/AxiosHelper";
import { strLimit } from "../helper/StringHelper";
import testimonial from "../image/testimonial.png"
import cottes from "../image/cottes.png"

const HomeTestimpnial = () => {

    const producttile = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };


    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`testimonials?limit=15&page=1`);
            if (data.status === true) {
                setData(data.data)
            }
        })();
    }, []);

    return (
        <div className="container position-relative">
            <img src={testimonial} alt="" className="testimonial_img w-100" />
            <div className="testimonial">
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="fs-2 fw-bold titletop">Testimonial</h3>
                        <hr />
                        <h4>Check what our customers says about us.</h4>
                        <img src={cottes} className="mt-4" alt="" width={60} height={60} />
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            autoPlay={true}
                            infinite={true}
                            autoPlaySpeed={2000}
                            showDots={false}
                            responsive={producttile}
                        >
                            {data?.map((item, key) => (
                                <div className="ms-6" key={item?.id}>
                                    <p className="mt-2 text-muted">
                                        {strLimit(item?.message, 260)}
                                    </p>
                                    <div className="d-flex">
                                        <div className="avtar">
                                            <img src={item?.image} alt="" className="rounded-circle" style={{ width: 50 }} />
                                        </div>
                                        <div className="ms-3 text-muted">
                                            <h5>{item?.name}</h5>
                                            <span>{item?.designation}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTestimpnial