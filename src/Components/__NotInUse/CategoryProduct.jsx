
import { Link } from 'react-router-dom'
import Carousel  from 'react-multi-carousel'
import catimage from '../assets/images/i7.jpg';

const categorytile = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CategoryProduct = () => {
  return (
    <>
 
    <div className='col-md-9 category_product pb-4 bgwhite'>
      <div className='row p-6 '>
            <div className='col-md-6 heading'>
              <p>HOMOEOPATHIC</p>
              <p>PRODUCTS</p>
            </div>
            <div className='col-md-6 contant'>
              <p>This popular homeopathic text for use in the home went 
                through five editions in both London and Boston,
                 where it was printed by Otis Clapp. Inside,</p>
                <hr/>
            </div>
        </div>
    <Carousel  swipeable={false}
          draggable={false}
          showDots={true} 
          responsive={categorytile}
      >
       <div className='row prl-6'>
          <div className='col-md-6'>
                <img
                className="d-block"
                src={catimage}
                alt="First slide"
                width="380"
                height="380"
                /> 
          </div>
          <div className='col-md-6 product_details'>
            <p className='themefont bold'> Alfalfa Tonic</p>
            <p> Price : &#8377; 100</p>
            <p> Available Pack size</p>
            <div className='attribute'>
              <button className='btn btn-outline-success'> 115ML</button>
              <button className='btn btn-outline-success'> 118ML</button>
              <button className='btn btn-outline-success'> 150ML</button>
            </div>
            <h3 className='pt-4'>Ingrediant its benefits</h3>
            <div className='description'>
              The price shown above includes all applicable taxes and fees. The information provided above is
              for reference purposes only. Products may go out of stock and delivery estimates may change at 
              any time.
            </div>
            <div className='action_button'>
                <Link to='#' className='col-md-12 col-12 '>ADD TO CART</Link>
                <Link to='#' className='col-md-12 col-12 '>BUY NOW</Link>
            </div>
          </div>
        </div>

        <div className='row prl-6'>
          <div className='col-md-6'>
                <img
                className="d-block"
                src={catimage}
                alt="First slide"
                width="380"
                height="380"
                /> 
          </div>
          <div className='col-md-6 product_details'>
            <p className='themefont bold'> Alfalfa Tonic</p>
            <p> Price : &#8377; 100</p>
            <p> Available Pack size</p>
            <div className='attribute'>
              <button className='btn btn-outline-success'> 115ML</button>
              <button className='btn btn-outline-success'> 118ML</button>
              <button className='btn btn-outline-success'> 150ML</button>
            </div>
            <h3 className='pt-4'>Ingrediant its benefits</h3>
            <div className='description'>
             The price shown above includes all applicable taxes and fees. The information provided above is
             for reference purposes only. Products may go out of stock and delivery estimates may change at 
             any time.
            </div>
            <div className='action_button'>
                <Link to='#' className='col-md-12 col-12 '>ADD TO CART</Link>
                <Link to='#' className='col-md-12 col-12 '>BUY NOW</Link>
            </div>
          </div>
        </div>
        </Carousel> 
    </div>   
        
    </>
  )
}

export default CategoryProduct