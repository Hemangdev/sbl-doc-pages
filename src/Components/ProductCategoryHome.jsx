import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosHelper from "../helper/AxiosHelper";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Button, Image } from "react-bootstrap";

const ProductCategoryHome = ({ featured_product }) => {
  const public_path = process.env.REACT_APP_PUBLIC_URL;
  const navigate = useNavigate()

  console.log('featured_product', featured_product);
  const [selected, setSelected] = useState(14)
  const [selectedItems, setSelectedItems] = useState([])
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AxiosHelper.getData(`featured_product/${selected}`);
        if (data.status === true) {
          setSelectedItems(data.data.featured_product)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [selected])

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

  const Review = ({ avg_review = 0, total = 0, showReadReview = () => null }) => {
    avg_review = Math.round(avg_review * 100) / 100
    return (
      <div className='d-flex align-items-center'>
        <span className="d-flex text-blue align-items-center">
          {[1, 2, 3, 4, 5].map((item, i) => (
            <i key={i} className={`mx-1 ${item <= Math.ceil(avg_review) ? 'fa fa-star' : 'fa-regular fa-star'}`} />
          ))}
          {total !== 0 ?
            <span className='text-success mx-2'>{avg_review} ({total})</span>
            :
            <span className='text-success mx-2 start-review'>({avg_review}/5)</span>
          }
        </span>
        {total !== 0 && <span role='button' className='my-0 mx-2 text-blue underline' onClick={() => showReadReview(true)}>Read Review</span>}
      </div>
    )
  }

  return (
    <section className="featured-product-section">
      <div className="container">
        <div className="row">
          <div className="feature-product-heading">
            <h3>Featured Products</h3>
          </div>
          <nav className="nav nav-pills">
            {
              featured_product.length > 0 &&
              featured_product.map((item) => {
                return (
                  <li class="nav-item">
                    <Link
                      role="tab"
                      className={`nav-link ${selected === item.category_id ? 'active' : ''}`}
                      aria-current="page"
                      to="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelected(item.category_id)
                        const items = featured_product.find((product) => product.category_id === item.category_id)
                        setSelectedItems(items.id)
                      }}
                    >
                      {item.category_name}
                    </Link>
                  </li>
                )
              })
            }
          </nav>
          {selectedItems?.length > 0 &&
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={2}
              spaceBetween={10}
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
                  spaceBetween: 5
                },
                550: {
                  slidesPerView: 1,
                  spaceBetween: 5
                },
                780: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 10
                },
                1200: {
                  slidesPerView: 2,
                  spaceBetwee: 20

                }
              }}

            >
              {
                selectedItems.map((item) => {
                  console.log('item?.attributes', item?.variants_attributes);
                  const calculatedPricePerUnit = item?.variants_attributes?.length > 0
                    ? Math.round((item.variants_attributes[0]?.price / item.variants_attributes[0]?.attribute_int) * 100) / 100
                    : null;
                  return (
                    <SwiperSlide>
                      {/* <a href={`${public_path}/product-details/${item?.slug}`}> */}
                      <div class="card">

                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0">
                            <Image
                              src={item.image}
                              alt=''
                              width={200}
                              height={150}
                              className="img-fluid"
                            />
                          </div>
                          <div class="flex-grow-1">
                            <div class="card-body">

                              <h6>{item.name}</h6>

                              <aside>
                                <ins>Price : ₹{item.price}</ins>&nbsp;
                                {calculatedPricePerUnit !== null && (
                                  <span>(₹{calculatedPricePerUnit} / {item.variants_attributes[0].attribute_unit})</span>
                                )}
                              </aside>
                              {item.variants_attributes?.length > 0 &&
                                attributeFuntion(item.variants_attributes).map((attr) => {
                                  return (
                                    <p>{attr.attr_name} :&nbsp;
                                      {
                                        attr.attribute.map((attribute) => {
                                          return (
                                            <>
                                              <span class="px-2 py-1">{attribute.name}</span> &nbsp;
                                            </>
                                          )
                                        })
                                      }
                                    </p>
                                  )
                                })
                              }

                              <Review avg_review={0} total={0} showReadReview={setShowReview} />

                              <div className="add-to-card-button-group">
                                <Button onClick={() => { navigate(`${public_path}/product-details/${item?.slug}`) }} className="buy-now-button" type="submit">Buy Now</Button>
                                <Button onClick={() => { navigate(`${public_path}/product-details/${item?.slug}`) }} className="add-to-cart" type="submit">Add To Cart</Button>
                              </div>

                            </div>
                          </div>
                        </div>


                      </div>
                      {/* </a> */}

                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          }
        </div>
      </div>
    </section >
  );
};

export default ProductCategoryHome;
