import { Container, Row, Col, Image } from "react-bootstrap";

import lab2 from "../../assets/images/lab2.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec2 = () => {
  return (
    <>
      <Container fluid className="bgwhite pb-5">
        <Container>
          <Row className="themeborder">
            <Col md="8" className="headsummery pl-2">
              <div className="heading3 pt-4">
                WHAT IS <br />
                HOMOEOPATHIC ?
              </div>
              <hr className="hrline" />
              <div className="content">
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                </p>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                </p>
              </div>
            </Col>
            <Col md="4" className="no-margin">
              <Image
                src={lab2}
                alt=""
                style={{ width: "100%", height: "100%" }}
              ></Image>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec2;
