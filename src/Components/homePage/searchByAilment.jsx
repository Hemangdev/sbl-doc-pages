import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import AxiosHelper from "../../helper/AxiosHelper";
import { Image } from "react-bootstrap";

const SearchByAilment = () => {
  const public_path = process.env.REACT_APP_PUBLIC_URL

  const [categories, setCategories] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosHelper.getData(`category`);
        if (data.status === true) {
          if (data?.data?.categories) {
            const filteredList = data?.data?.categories?.find((item) => item.slug === 'personal-care');
            setCategories(filteredList?.children || []);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [])

  return (
    <section className="search-swiper-slider">
      <div className="container">
        <div className="row">

          <div className="search-by-heading">
            <h3>Search by Ailment</h3>
          </div>
          {categories?.length > 0 &&
            <Swiper
              navigation={true}
              modules={[Keyboard, Pagination, Navigation, Autoplay]}
              slidesPerView={6}
              spaceBetween={40}
              speed={1000}
              className="mySwiper"

              keyboard={{
                enabled: true
              }}


              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}

              breakpoints={{
                350: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                500: {
                  slidesPerView: 3,
                  spaceBetween: 7
                },
                676: {
                  slidesPerView: 4,
                  spaceBetween: 10
                },
                992: {
                  slidesPerView: 5,
                  spaceBetween: 10
                },
                1200: {
                  slidesPerView: 6,
                  spaceBetween: 40

                }
              }}

            >
              {
                categories.map((item) => {
                  return (
                    <SwiperSlide>
                      <a href={`${public_path}/product/${item?.slug}`}>
                        <div class="card">
                          <Image
                            src={item.image}
                            alt=''
                            width={200}
                            height={200}
                            className="img-fluid"
                          />
                          <div class="card-body">
                            <h5>{item.name}</h5>

                          </div>
                        </div>
                      </a>

                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          }
        </div>
      </div>
    </section>
  )
}

export default SearchByAilment