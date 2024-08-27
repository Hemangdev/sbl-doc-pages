import { Card,Container,Row,Col } from 'react-bootstrap'
import Carousel  from 'react-multi-carousel'
import pro1  from '../assets/images/blog.jpg';


const bloagtile = {
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

const Bolg = () => {
  return (
    <>
        <Carousel  swipeable={false}
            draggable={false}
            showDots={true} 
            responsive={bloagtile}
        >
          {[
              'Bolog1',
              'Bolog2',
              'Bolog3',
              'Bolog4',
              'Bolog5',
              'Bolog6',
              'Bolog7',
              'Bolog8',
            ].map((variant) => (
              <Card
                style={{ width: '18em'}}
                className="blogcard"
                key={variant} 
              >
                <img src={pro1} className="card-img-top w-100"  style={{ border: '1px solid green'}} alt='img'/>
                <Card.Body style={{ border: '1px solid green' }}>
                  <Card.Title className="bold themefont"> {variant} is Widely Locking Menstrual Hygniene Awareness</Card.Title>
                  <Card.Text className="themefont text-left">
                    {variant} Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                
                <Col md="12" className="d-flex">
                  <div className='date w-60 p-3'>Feb 25, 2021</div>
                  <div className='readbtn w-40 p-3 '> READ MORE</div>
                </Col>
              </Card>
          ))}
        </Carousel>   
    </>
  )
}

export default Bolg