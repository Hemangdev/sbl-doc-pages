import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Image } from "react-bootstrap";

const PopularPick = ({ best_seller }) => {
  const public_path = process.env.REACT_APP_PUBLIC_URL;

  const attributeFuntion = (array) => {
    const data = array.reduce((acc, curr) => {
      const masterIds = curr.attribute_master_id.split(',');
      const attributeIds = curr.attribute_id.split(',');
      const masterValues = curr.attribute_master_values.split(',');
      const attributeValues = curr.attribute_values.split(',');

      masterIds.forEach((id, index) => {
        const existingAttr = acc.find(attr => attr.attr_id === id);
        const newAttribute = {
          id: parseInt(attributeIds[index], 10),
          name: attributeValues[index]
        };

        if (existingAttr) {
          if (!existingAttr.attribute.some(attr => attr.id === newAttribute.id)) {
            existingAttr.attribute.push(newAttribute);
          }
        } else {
          acc.push({
            attr_id: id,
            attr_name: masterValues[index],
            attribute: [newAttribute]
          });
        }
      });

      return acc;
    }, []);

    return data;
  }

  return (
    <section className="popular-pick-swiper">
      <div className="container">
        <div className="row">
          <div className="popular-heading">
            <h3>Popular Pick</h3>
          </div>
          {best_seller?.length > 0 &&
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={4}
              spaceBetween={20}
              navigation={true}
              speed={1000}
              className="mySwiper"

              keyboard={{
                enabled: true
              }}

              autoplay={{
                delay: 4000,
                disableOnInteraction: true
              }}

              breakpoints={{
                350: {
                  slidesPerView: 1,
                  spaceBetween: 7
                },
                550: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                667: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 20

                }
              }}

            >
              {
                best_seller.map((item) => {
                  return (
                    <SwiperSlide>
                      <a href={`${public_path}/product-details/${item?.slug}`}>
                        <div class="card">
                          <div className="popular-pick">
                            <Image
                              src={item.image}
                              alt=''
                              width={320}
                              height={150}
                              className="img-fluid"
                            />
                          </div>
                          <div class="card-body">

                            <h6>{item.name}</h6>

                            {item.attributes?.length > 0 &&
                              attributeFuntion(item.attributes).map((attr) => {
                                return (
                                  <p>{attr.attr_name} :- &nbsp;
                                    {
                                      attr.attribute.map((attribute) => {
                                        return (
                                          <span class="px-2 py-1 me-1">{attribute.name}</span>
                                        )
                                      })
                                    }
                                  </p>
                                )
                              })
                            }

                            <aside className="mb-2"><ins>Price : ₹{item.price}</ins>&nbsp;&nbsp;( ₹{Math.round((item.attributes[0]?.price / item.attributes[0]?.attribute_int) * 100) / 100} / {item.attributes[0]?.attribute_unit} )</aside>
                            <Button type="submit"> Buy Now </Button>

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

export default PopularPick