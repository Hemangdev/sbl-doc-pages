import { Container, Row, Col, Image } from "react-bootstrap";

import lab2 from "../../assets/images/dises.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec6 = () => {
  return (
    <>
      <Container fluid className="bgwhite pb-2">
        <Container>
          <Row className="themeborder">
            <Col md="8" className="headsummery pl-2">
              <div className="heading5 pt-4">
                GENERAL DISEASES <br />
                WHERE HOMOEOPATHIC <br />
                OFFER A BETTER SOLUTION ?
              </div>
              <hr className="hrline" />
              <div className="">
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                </p>
                <ul className="themelist">
                  <li>
                    Homoeopathic to popular belief, Lorem Ipsum is not simply
                  </li>
                  <li>It has roots in a piece is not simply</li>
                  <li>Contrary to popular belief </li>
                  <li>It has roots in a piece of classical </li>
                  <li>Contrary to popular belief</li>
                  <li>It has roots in a piece </li>
                  <li>
                    Homoeopathic to popular belief, Lorem Ipsum is not simply
                  </li>
                  <li>It has roots in a piece </li>
                  <li>It has roots in a piece </li>
                  <li>It has roots in a piece </li>
                </ul>
                <p>
                  The above to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                </p>
              </div>
            </Col>
            <Col md="4" className="no-margin">
              <div className="h-50 bgtheme p-4">
                <ul className="">
                  <li>Effective</li>
                  <li>No Side Effect</li>
                  <li>Not Addictive</li>
                  <li>Work At dynamic plane</li>
                  <li>Holistic</li>
                  <li>Work ay</li>
                  <li>Holistic</li>
                  <li>Effective</li>
                  <li>Not Addictive</li>
                  <li>Work At dynamic plane</li>
                  <li>S plane</li>
                </ul>
              </div>
              <Image
                src={lab2}
                alt=""
                style={{ width: "100%", height: "50%" }}
              ></Image>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec6;
