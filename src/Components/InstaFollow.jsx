import useSetting from '../Hooks/useSetting'
import { useEffect, useState } from 'react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Image } from 'react-bootstrap'
import axios from 'axios';

const InstaFollow = () => {

  const { instagram_handle } = useSetting()

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const fetchInitialPosts = async () => {
    let paging;
    const array = [];
    try {
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=IGQWRQSHYweVJreTBUWHppRGF3Q3lZAMWJNX0Vram96ZAmxBU2VIVWRqaGJteXBWT1VXYVRJekYyRlhtcXFac2VNX2pOYkp0TG0wLWdQSURnY2ZAFdDdWblRjVE4wejRlTy1mMDRJWjZAUNGRnS0x6YzVMbjZAqLXR1eG8ZD`;
      // const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=IGQWRNU1llOV9TMmFUdTBWNEtEZAXVxbDM5dThuenZAzN0p1bE9iNVMtbzBTMk9nU1dEZAzZAqM1FWamVfdlZAxdEI2RVEzVDZA0VHNMdUx3bmJqMVFLZAHMyYzNkREdPRE1ZAcks0NjJ2SDVLcEFPazVxeUtXMjVRblJmYVUZD`;

      const response = await axios.get(url);
      const data = response.data;

      const imagePosts = data.data.filter(post => post?.media_type === 'IMAGE') || []
      paging = data.paging.next;
      array.push(...imagePosts);

      for (let index = 0; index < 4; index++) {
        if (!paging) break;

        const response = await axios.get(paging);
        const data = response.data;

        const moreImagePosts = data?.data?.filter(post => post?.media_type === 'IMAGE') || []

        paging = data.paging.next;
        array.push(...moreImagePosts);
      }

      setPosts(array);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
    }
  };


  return (
    <>
      <section className='instragram-follow'>
        <div className="row">
          <div className="col-12">
            <div className="follow-heading">
              <h3> Follow <a className="text-decoration-none" href="https://www.instagram.com/sblgroupindia" target="_blank" rel="noreferrer">{instagram_handle}</a> on Instagram</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="follow-instagram-section">
        <div className='container'>

          {
            posts?.length > 0 &&
            <div className="row">
              <Swiper
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
                    spaceBetween: 10
                  },
                  550: {
                    slidesPerView: 2,
                    spaceBetween: 10
                  },
                  667: {
                    slidesPerView: 3,
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
                  posts.map((item) => {
                    return (
                      <SwiperSlide>
                        <div className="saving-swiper-card">
                          <a href={item?.permalink} target="_blank" rel="noreferrer">
                            <div className="card">
                              <Image
                                src={item.media_url}
                                alt=''
                                width={320}
                                height={320}
                              // className="img-fluid"
                              />
                            </div>
                          </a>
                        </div>

                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>

              {/* {
              imageUrls.map((item) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div className="card">
                      <Image
                        src={item}
                        alt=''

                        className="img-fluid"
                      />
                    </div>
                  </div>
                )
              })
            } */}
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default InstaFollow