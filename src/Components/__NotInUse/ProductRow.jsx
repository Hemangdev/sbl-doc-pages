import { Row, Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductRow = (props) => {
  let data = props.data;
  return (
    <>
      <div className="protile  mt-2">
        <Row>
          <Image className="d-block w-100" src={data.image} alt="" />
          <p>{data.name}</p>
        </Row>
        <Row className=" pricetile">
          <Col md="8" className="priceright">
            <div className="p1">&#8377; {data.mrp}</div>
            <div className="p2">MRP: &#8377; {data.price}</div>
            <div className="p3">You Save: &#8377; 70 (15%)*</div>
          </Col>
          <Link to="#" className="col-md-4 priceleft pt-4 pb-3">
            BUY NOW
          </Link>
        </Row>
      </div>
    </>
  );
};

export default ProductRow;
