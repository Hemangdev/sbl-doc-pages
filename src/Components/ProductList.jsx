import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import ProductBox from "./include/Products/ProductBox";

const producttile = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductList = ({ best_seller = [] }) => {
  return (
    <>
      {best_seller.length > 0 ?
        <Container fluid className="bestselling pt-5">
          <Container className="position-relative">
            <div className="blogtitle  fs-2 text-uppercase fw-bold position-absolute ">RELATED PRODUCTS</div>
            <Carousel
              swipeable={false}
              draggable={false}
              autoPlay={true}
              infinite={true}
              autoPlaySpeed={2000}
              showDots={true}
              className="pt-5"
              responsive={producttile}
            >
              {best_seller?.map((item, key) => (
                <ProductBox key={key} item={item} />
              ))}
            </Carousel>
          </Container>
        </Container> : null}
    </>
  );
};

export default ProductList;
