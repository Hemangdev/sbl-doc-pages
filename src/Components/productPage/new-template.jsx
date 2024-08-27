import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Thumbs } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import InstaFollow from "../InstaFollow";

import Staricon from '../../image/star-icon.svg'
import Startdark from '../../image/start-dark.svg'
import ShareIcon from '../../image/share-icon.svg'


import { Image } from "react-bootstrap";
import ProductList from "../ProductList";
import { formatDateDDMMYYYY } from "../../helper/StringHelper";
import SocialShare from "./social-share";
import ProductRatingComment from "./productRatingComment";


const NewTemplateProduct = ({
  data,
  setData,
  ButtonGroup,
  Review,
  responsive,
  price,
  specialPrice,
  mrp,
  ipCheck,
  perUnitData,
  setShowReview,
  changeAttr,
  attr,
  handelQty,
  qty,
  errorMsg,
  isDisabled,
  addToCartIni,
  buyNow,
  submitPostalCode,
  setPostCode,
  setPostCodeMessage,
  postCodeMessage,
  responsive_2,
  showReview,
  strLimit,
  relatedProducts,
  calculateSavingsPercentage
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(1)
  const [description, setDescription] = useState('')
  const [faqs, setFaqs] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    setDescription(data.indication)
    if (data?.extra_data?.faq_data?.title?.length > 0) {
      const faqsData = data.extra_data.faq_data?.title.map((item, i) => {
        if (item?.length > 0 && data.extra_data.faq_data.description[i]?.length > 0) {
          return {
            title: item,
            value: data.extra_data.faq_data.description[i]
          };
        }
      }).filter(item => item !== undefined);

      setFaqs(faqsData)
    }
  }, [data]);

  const [openIndex, setOpenIndex] = useState(0); // Default to first item

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? -1 : index); // Toggle open/close
  };

  const totalReviews = data?.reviews?.length;

  const ratingCounts = data?.reviews?.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const ratingPercentages = ratingCounts && {
    1: ((ratingCounts[1] || 0) / totalReviews) * 100,
    2: ((ratingCounts[2] || 0) / totalReviews) * 100,
    3: ((ratingCounts[3] || 0) / totalReviews) * 100,
    4: ((ratingCounts[4] || 0) / totalReviews) * 100,
    5: ((ratingCounts[5] || 0) / totalReviews) * 100
  };

  return (
    <>
      <section className="product-details-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
              <div className="product-swiper-slider">
                <Swiper
                  initialSlide={index}
                  loop={true}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}

                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Thumbs, Pagination]}
                  className="mySwiper2"
                >
                  {
                    data.image?.length > 0 &&
                    data.image.map((item) => {
                      return (
                        <SwiperSlide>
                          <div className="main-swiper-slider">
                            <img src={item} alt="Product Images" width={450} height={450} />
                          </div>
                        </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
                {data.image?.length > 1 &&
                  <Swiper
                    onClick={(e) => { setIndex(e.clickedIndex) }}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={data.image?.length}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper"
                  >
                    {
                      data.image?.length > 0 &&
                      data.image.map((item) => {
                        return (
                          <SwiperSlide>
                            <div className="thumbnail-sliders">
                              <img src={item} alt="Product" width={100} height={100} />
                            </div>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>

                }
                <div className="share-button">
                  <button className="btn" type="button">
                    <Image
                      src={ShareIcon}
                      alt='ShareIcon'
                      className="img-fluid"
                      height={55} width={55}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 col-sm-12">
              <div className="products-details-content">
                <h2>
                  {data?.name}
                </h2>
                <p className="global-sub-heading">Protects against the sun's ultraviolet</p>

                {data?.reviews?.length > 0 &&
                  <p className="review-start">
                    <Image
                      src={Staricon}
                      alt='Star'
                      className="img-fluid"
                      height={15} width={15}
                    />
                    &nbsp;&nbsp;
                    {parseFloat(data.avg_review) > 0 ? parseFloat(data.avg_review).toFixed(2) : ''} | {data?.reviews?.length} {data?.reviews?.length > 1 ? 'reviews' : 'review'}
                  </p>
                }
                <div className="price-content">
                  <h5>MRP : <span dangerouslySetInnerHTML={{ __html: typeof price == 'number' ? `₹${price}` : price }} />
                    {/* {specialPrice < mrp && <span style={specialPrice !== mrp ? { textDecoration: 'line-through', fontSize: '14px' } : { textDecoration: 'default' }} dangerouslySetInnerHTML={{ __html: mrp }} />} */}
                    {ipCheck && false ? <span className='small text-blue ms-1'>({data?.gst_name})</span> : null}
                    {price && (parseFloat(mrp) > parseFloat(typeof price == 'number' ? price : price?.replace('₹', ''))) &&
                      <span className='price-name  small text-blue mx-1'> Save {calculateSavingsPercentage(parseFloat(mrp), parseFloat(typeof price == 'number' ? price : price?.replace('₹', '')))}%</span>
                    }
                  </h5>
                </div>

                {data.variants_attributes?.length === 1 ?
                  <>
                    <div className="aviilable-pack">
                      <p>Available Pack {data.variants_attributes[0]?.attribute_master_values}</p>
                    </div>
                    <div className="mrp-box">
                      <h5>{data.variants_attributes[0]?.attribute_values}</h5>
                      <p> MRP : <span>₹{data.variants_attributes[0]?.price}</span> </p>
                    </div>
                  </>
                  :
                  <>
                    {data?.variants?.map((item, i) => (
                      <div className='my-1' key={i}>
                        <h6 className='py-2'> {item?.attr_name} : </h6>
                        <div className="d-flex gap-2 flex-wrap">
                          {item?.attribute?.map((row, j) => (
                            <div className="form-check-radio" key={j}>
                              <input className="form-check-input d-none" type="radio" value={row.id} onChange={() => changeAttr(item?.attr_id, row?.id)} checked={attr[item?.attr_id] === row?.id} name={item?.attr_id} id={`${i}_${j}`} />
                              <label className={`btn btn-sm rounded-0 btn-outline-success`} htmlFor={`${i}_${j}`}>
                                {row?.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                }

                <div class="qountity-form">
                  <span>Quantity</span>
                  <div class="input-group mx-2">
                    <button onClick={() => handelQty('-')} class="input-group-text bg-none rounded-0">
                      <i class="fa fa-minus"></i>
                    </button>
                    <input onChange={handelQty} min={1} max={10} type="nummber" class="form-control fw-bold text-center" value={qty} />
                    <button onClick={() => handelQty('+')} class="input-group-text bg-none rounded-0"><i class="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div style={{ color: 'red' }}>
									{errorMsg}
								</div>
                <div className="inclusive-content">
                  <p>MRP inclusive of all taxes.Usually delivered in 3-5 days.</p>
                </div>

                <div className="product-details-button-group">
                  <button type="button" class="btn btn-blue" onClick={() => !isDisabled && addToCartIni(data.id, qty)} disabled={isDisabled}>Add to Cart</button>
                  <button type="button" class="btn btn-success" onClick={() => !isDisabled && buyNow(data.id, qty)} disabled={isDisabled}>Buy Now</button></div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="prducts-deatils-tab">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">

                {data?.indication?.length > 0 &&
                  <li class="nav-item" role="presentation">
                    <button onClick={() => setDescription(data.indication)} class="nav-link active" id="prudct-details-tab" data-bs-toggle="pill" data-bs-target="#prudct-details" type="button" role="tab" >Indication / Benefits</button>
                  </li>
                }

                {data?.description?.length > 0 &&
                  <li class="nav-item" role="presentation">
                    <button onClick={() => setDescription(data.description)} class="nav-link" id="prudct-details-tab111" data-bs-toggle="pill" data-bs-target="#prudct-details111" type="button" role="tab" >PRODUCT DESCRIPTION</button>
                  </li>
                }

                {data?.ingredient?.length > 0 &&
                  <li class="nav-item" role="presentation">
                    <button onClick={() => setDescription(data.ingredient)} class="nav-link" id="product-decription-tab" data-bs-toggle="pill" data-bs-target="#product-description" type="button" role="tab" aria-selected="false">Key Ingredients</button>
                  </li>
                }

                {data?.dosage?.length > 0 &&
                  <li class="nav-item" role="presentation">
                    <button onClick={() => setDescription(data.dosage)} class="nav-link" id="key-ingredients-tab" data-bs-toggle="pill" data-bs-target="#key-ingredients" type="button" role="tab" >Dosage</button>
                  </li>
                }

                {data?.safety.length > 0 &&
                  <li class="nav-item" role="presentation">
                    <button onClick={() => setDescription(data.safety)} class="nav-link" id="dosage-tab" data-bs-toggle="pill" data-bs-target="#dosage" type="button" role="tab" >Safety Information</button>
                  </li>
                }

              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active">
                  <div className="row">
                    <div className="col-12">
                      <div class="product-details-row" dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data?.imageContent?.length > 0 &&
        <section className="slik-banner">
          <div className="container">
            <div className="row">
              {data?.imageContent?.map((item) => {
                return (
                  <div className="col-12 text-center">
                    <Image
                      src={item}
                      alt='Slki Banner'

                      className="img-fluid"
                    />
                  </div>
                )
              })}

            </div>
          </div>
        </section>
      }

      {faqs?.length > 0 &&
        <section className="faqs-section">
          <div className="container">
            <div className="row">
              <div className="faqs-heading">
                <h3>FAQs</h3>
              </div>
              <div className="col-12">
                <div className="faqs-content">
                  <div class="accordion" id="faqs-parent">
                    {faqs.map((item, i) => (
                      <div className="accordion-item" key={i}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#verified-purchase-${i}`}
                          >
                            {item.title}
                          </button>
                        </h2>
                        <div
                          id={`verified-purchase-${i}`}
                          className="accordion-collapse collapse"
                          data-bs-parent="#faqs-parent"
                        >
                          <div className="accordion-body">
                            <p>{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      {
        data?.reviews?.length > 0 &&
        <section className="customer-reviews-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                <div className="customer-reviews-content">
                  <h3>customer reviews</h3>
                  <h4>{parseFloat(data.avg_review).toFixed(2)} <span>Based on {data?.reviews?.length} {data?.reviews?.length > 1 ? 'reviews' : 'review'}</span></h4>
                  <div className="review-start-list">
                    <ul className="list-inline">
                      {[...Array(5)].map((_, starIndex) => (
                        <li className="list-inline-item" key={starIndex}>
                          {parseFloat(data.avg_review) > starIndex ? (
                            <Image
                              src={Staricon}
                              alt='Star'
                              className="img-fluid"
                              height={20}
                              width={20}
                            />
                          )
                            :
                            (
                              <li className="list-inline-item">
                                <Image
                                  src={Startdark}
                                  alt='Star'
                                  className="img-fluid"
                                  height={20}
                                  width={20}
                                />
                              </li>
                            )
                          }
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul class="list-unstyled">
                    <li className="progress-bars">
                      <div className="progress-row">
                        <span>5 Star</span>
                        <div class="my-3 progress"><div role="progressbar" style={{ width: `${ratingPercentages[5].toFixed(2)}%` }} class="progress-bar progress-step-1" aria-valuenow={ratingPercentages[5].toFixed(2)} aria-valuemin="0" aria-valuemax="100"></div></div>
                        <span >{ratingPercentages[5].toFixed(2)}%</span>
                      </div>

                    </li>
                    <li className="progress-bars">
                      <div className="progress-row">
                        <span>4 Star</span>
                        <div class="my-3 progress ">
                          <div role="progressbar" style={{ width: `${ratingPercentages[4].toFixed(2)}%` }} class="progress-bar progress-step-2" aria-valuenow={ratingPercentages[4].toFixed(2)} aria-valuemin="0" aria-valuemax="100"></div></div>
                        <span >{ratingPercentages[4].toFixed(2)}%</span>
                      </div>

                    </li>

                    <li className="progress-bars">
                      <div className="progress-row">
                        <span>3 Star</span>
                        <div class="my-3 progress ">
                          <div role="progressbar" class="progress-bar" style={{ width: `${ratingPercentages[3].toFixed(2)}%` }} aria-valuenow={ratingPercentages[3].toFixed(2)} aria-valuemin="0" aria-valuemax="100"></div></div>
                        <span >{ratingPercentages[3].toFixed(2)}%</span>
                      </div>

                    </li>

                    <li className="progress-bars">
                      <div className="progress-row">
                        <span>2 Star</span>
                        <div class="my-3 progress ">
                          <div role="progressbar" class="progress-bar" style={{ width: `${ratingPercentages[2].toFixed(2)}%` }} aria-valuenow={ratingPercentages[2].toFixed(2)} aria-valuemin="0" aria-valuemax="100"></div></div>
                        <span >{ratingPercentages[2].toFixed(2)}%</span>
                      </div>

                    </li>

                    <li className="progress-bars">
                      <div className="progress-row">
                        <span>1 Star</span>
                        <div class="my-3 progress ">
                          <div role="progressbar" class="progress-bar" style={{ width: `${ratingPercentages[1].toFixed(2)}%` }} aria-valuenow={ratingPercentages[1].toFixed(2)} aria-valuemin="0" aria-valuemax="100"></div></div>
                        <span >{ratingPercentages[1].toFixed(2)}%</span>
                      </div>

                    </li>
                  </ul>
                  {token != null && token.length > 0 &&
                    <div className="review-box-button">
                      <button type="button" class="btn review-button" data-bs-toggle="modal" data-bs-target="#productRatingModal">
                        WRITE A REVIEW
                      </button>
                    </div>
                  }

                  <div>


                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                <div className="customer-review-right-content">
                  <h3>Customer Reveiws ({data?.reviews?.length})</h3>
                  <div className="accordions-reviews">
                    <div className="accordion" id="Verified-accrdion">
                      {data?.reviews.map((item, i) => (
                        <>
                          {i <= 2 && (
                            <div className="accordion-item" key={i}>
                              <button
                                className={`accordion-button ${openIndex === i ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => handleAccordionClick(i)}
                              >
                                <div className="accordion-header">
                                  <div className="verified-content">
                                    <h4>{item.customer_name} <span>VERIFIED PURCHASE</span></h4>
                                  </div>
                                  <div className="review-star-accordion">
                                    <ul className="list-inline">
                                      {[...Array(5)].map((_, starIndex) => (
                                        <li className="list-inline-item" key={starIndex}>
                                          {item.rating > starIndex ? (
                                            <Image
                                              src={Staricon}
                                              alt='Star'
                                              className="img-fluid"
                                              height={20}
                                              width={20}
                                            />
                                          )
                                            :
                                            (
                                              <li className="list-inline-item">
                                                <Image
                                                  src={Startdark}
                                                  alt='Star'
                                                  className="img-fluid"
                                                  height={20}
                                                  width={20}
                                                />
                                              </li>
                                            )
                                          }
                                        </li>
                                      ))}

                                      <li className="list-inline-item">
                                        <span>{formatDateDDMMYYYY(item.created_at)}</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </button>

                              <div
                                id={`Verified-prrchase-${i}`}
                                className={`accordion-collapse collapse ${openIndex === i ? 'show' : ''}`}
                                data-bs-parent="#Verified-accrdion"
                              >
                                <div className="accordion-body ps-1">
                                  <p>{item.comment}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      }

      <section className="contact-accordion">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="accordion" id="Contact-info-accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#Manufacturer">
                      MANUFACTURER & CONTACT INFO
                    </button>
                  </h2>
                  <div id="Manufacturer" class="accordion-collapse collapse" data-bs-parent="#Contact-info-accordion">
                    <div class="accordion-body">
                      <div className="accordion-body-inner">
                        <p><strong>Manufacture Name: </strong>Depending on batch number - Body Cupid Private Limited 01 At Plot No. 10-11,Sector-3,Parwano H P.173220 India Mfg.Lic No. HIM/COS/L/22/342:13.At Plot No.111,STCE,Musalgaon Sinnar Nashik,Maharastra-422112</p>

                        <p><strong>Marketed By &amp; Contact Details</strong>Body Cupid Pvt. Ltd. - 4th floor, Prestige Doctom,Field Marshal Cariappa Road ,Srinivas Nagar ,Shanthala Nagar,Ashok Nagar Bengaluru -560025,Karnatka ,India</p>
                      </div>
                      <div className="contact-address-content">
                        <p>Customer Care Details</p>
                        <p><span>Email</span>: support@buynow.in</p>
                        <p><span>Phone no.</span>+91-80-428690000</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductRatingComment productId={data.id} setData={setData} />
      <ProductList best_seller={relatedProducts} />
      <InstaFollow />
    </>
  )
}

export default NewTemplateProduct;