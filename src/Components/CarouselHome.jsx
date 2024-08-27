import { Navigation, Pagination, Scrollbar, A11y, Keyboard, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Image } from 'react-bootstrap';

const CarouselHome = ({ banner = [] }) => {

  return (
    <>
      <section className="hero-banner">

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          speed= {1200}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation, Autoplay]}
          className="mySwiper"
          keyboard={{
            enabled: true
          }}
          pagination={{
            clickable: true
          }}
          autoplay={{
            delay: 9000,
            disableOnInteraction: false
          }}

          // breakpoints={{
          //   350: {
          //     slidesPerView: 2,
          //     spaceBetween: 7
          //   },
          //   550: {
          //     slidesPerView: 2,
          //     spaceBetween: 10
          //   },
          //   992: {
          //     slidesPerView: 3,
          //     spaceBetween: 10
          //   },
          //   1200: {
          //     slidesPerView: 4
          //   }
          // }}


          

        >
          {banner.map((item) => {
            return (
              <SwiperSlide>
                <a href={item.url}>
                  <Image
                    className="img-fluid w-100"
                    src={item.image}
                  />
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>

    </>

  );
};
export default CarouselHome;
