import { Container, Row, Col, Image } from "react-bootstrap";

import img from "../../assets/images/advantage.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutHomoeopathicSec9 = () => {
  return (
    <>
      <Container fluid className="bgwhite pt-3 pb-5">
        <Container>
          <Row className="">
            <Col md="8" className="">
              <div className="heading4 pt-4">MYTHS & FACTS</div>
              <hr className="hrline w-10" />
              <div className="content">
                <p>
                  <b>Myth :</b> Homoeopathic is slow acting
                </p>
                <p>
                  <b>Fact :</b> Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical
                </p>
                <p>
                  <b>Myth :</b> Popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical
                </p>
                <p>
                  <b>Fact :</b> Homoeopathic is slow acting
                </p>
                <p>
                  <b>Myth :</b> Contrary to popular belief, Lorem Ipsum is not
                  simply random text. It has roots in a piece of classical
                </p>
                <p>
                  <b>Fact :</b> Homoeopathic is slow acting
                </p>
                <p>
                  <b>Myth :</b> Popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical
                </p>
                <p>
                  <b>Fact :</b> Homoeopathic is slow acting
                </p>
              </div>
            </Col>
            <Col md="4">
              <Image
                src={img}
                alt=""
                style={{ width: "100%", height: "100%", maxHeight: "450px" }}
              ></Image>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutHomoeopathicSec9;
