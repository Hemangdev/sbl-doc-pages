import { Container, Row, Col, Image } from "react-bootstrap";

import img from "../../assets/images/advantage.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec7 = () => {
  return (
    <>
      <Container fluid className="bgwhite pt-3 pb-4">
        <Container>
          <Row className="themeborder">
            <Col md="4" className="no-margin ">
              <Image
                src={img}
                alt=""
                style={{ width: "100%", height: "100%", maxHeight: "450px" }}
              ></Image>
            </Col>
            <Col md="7" className="headsummery pl-2">
              <div className="heading4 pt-4">
                GOODNESS <br />
                OF HOMOEOPATHY
              </div>
              <hr className="hrline w-10" />
              <div className="content">
                <p>
                  Text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
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
                  classical Latin literature from 45 BC, making it over 2000
                </p>
                <p>
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 Contrary to popular belief,
                  Lorem Ipsum is not simply random text. It has roots in a piece
                  of classical Latin literature from 45 BC, making it over 2000
                  classical Latin literature from 45 BC, making it over 2000
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec7;
