import { Container, Row, Col, Image } from "react-bootstrap";

import lab2 from "../../assets/images/lab2.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec1 = () => {
  return (
    <>
      <Container fluid className="bgwhite pt-5 pb-4">
        <Container>
          <Row className="themeborder">
            <Col md="4" className="no-margin">
              <Image
                src={lab2}
                alt=""
                style={{ width: "100%", height: "92%" }}
              ></Image>
              <div
                className="themeborder text-center w-100 bold align-middle"
                style={{
                  height: "8%",
                  fontSize: "10px",
                  lineHeight: "2.5",
                  color: "#4267B2",
                }}
              >
                STAY HOME | STAY SAFE | FIGHT COVID-19
              </div>
            </Col>
            <Col md="7" className="headsummery pl-2">
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
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec1;
