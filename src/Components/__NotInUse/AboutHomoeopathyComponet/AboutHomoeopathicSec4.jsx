import { Container, Row, Col, Card } from "react-bootstrap";
import img from "../../assets/images/homoeopathy.jpg";
import img2 from "../../assets/images/allopathy.jpg";
// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec4 = () => {
  return (
    <>
      <Container fluid className="bgwhite pt-4 pb-4">
        <Container>
          <h3 className="text-center themefont2 bold">
            HOMOEOPATHIC VS ALLOPATHY
            <hr className="hrline mx-auto w-10 mt-0" />
          </h3>

          <Row className="sec4 pt-2">
            <Col md="6">
              <Card className="mb-2">
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={img}
                    style={{ height: "200px" }}
                  />
                  <Card.Title>HOMOEOPATHIC</Card.Title>
                  <ul>
                    <li>
                      Homoeopathic to popular belief, Lorem Ipsum is not simply
                      random Lorem Ipsum is not simply random
                    </li>
                    <li>
                      It has roots in a piece of classical Latin literature
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random
                    </li>
                    <li>
                      It has roots in a piece of classical Latin literature
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random Lorem Ipsum is not simply random
                    </li>
                    <li>
                      It has roots in a piece of classical Latin literature
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card className="mb-2">
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={img2}
                    style={{ height: "200px" }}
                  />
                  <Card.Title>HOMOEOPATHIC</Card.Title>
                  <ul>
                    <li>
                      Allopahty has roots in a piece of classical Latin
                      literature
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random Lorem Ipsum is not simply random
                    </li>
                    <li>
                      It has roots in a piece of classical Latin literature
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random Lorem Ipsum is not simply random
                    </li>
                    <li>
                      It has roots in a piece of classical Latin literature
                    </li>
                    <li>
                      Contrary to popular belief, Lorem Ipsum is not simply
                      random
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec4;
