import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const OfficeDetail = () => {
  return (
    <Col md="9" className="office-detail">
      <Row>
        <Col md="6" xs="12">
          <div className="left">
            <div className="head">Corporate Office</div>
            <div className="mt-5 d-flex justify-content-between align-items-center">
              <div className="small-ratings">
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star rating-color"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                &nbsp;
                <span>5.0(1)</span>
              </div>
              <Link to="/" target="_blank">
                Write a review
              </Link>
            </div>
            <div className="contant">
              <p>
                SBL relieve symptome of allergic conditions, including hay fever
                symptome and hives A homoeopathic medicine of allergic
                conditions, including hay fever symptome and hives A
                homoeopathic medicine allergic conditions, including hay fever
                symptome and hives A homoeopathic medicine
              </p>
            </div>
          </div>
        </Col>
        <Col md="6" xs="12">
          <div className="right">
            <div className="list-item">
              <span className="fa fa-map-location-dot"></span>
              <p>
                SBL House 2 commercal complex Shrestha vihar Delhi-342001 ,India
              </p>
            </div>
            <div className="list-item">
              <span className="fa fa-mobile-retro"></span>

              <p>+91-9999999999</p>
            </div>
            <div className="list-item">
              <span
                className="fa-solid fa-mobile-screen"
                aria-hidden="true"
              ></span>
              <p>+91-9999999999</p>
            </div>
            <div className="list-item">
              <span className="fa-solid fa-envelope-open-text"></span>
              <p>demo@demo.com</p>
            </div>
            <div className="list-item">
              <span className="fa fa-map-location-dot"></span>

              <p>Get Direction</p>
            </div>
            <Row className="pt-5">
              <button className="btn btn-success col-md-5 col-sm-4  col-xs-4 p-2 ml-2">
                Call us
              </button>
              <button className="btn btn-success col-md-5 col-sm-4 col-xs-4 p-2 ml-2">
                Drop a message
              </button>
            </Row>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default OfficeDetail;
