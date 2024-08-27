import Carousel from "react-multi-carousel";

const servicetile = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Service = ({ feeds = [] }) => {

  return (
    <>
      <div className=' services'>
        <Carousel
          swipeable={true}
          draggable={false}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={3000}
          showDots={false}
          responsive={servicetile}
        >
          {feeds?.map((item, key) => (
            <div key={key} className='position-relative' style={{ height: '250px' }}>
              <img className="img-fluid h-100 w-100" src={item.media_url} alt='img' />
              <a className='position-absolute top-0 start-0 w-100 h-100 hover-dark'
                href={item.permalink}
                target="__lucky">
                <span className='d-flex justify-content-center align-items-center text-uppercase text-white fw-bolder'>View More</span>
              </a>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default Service