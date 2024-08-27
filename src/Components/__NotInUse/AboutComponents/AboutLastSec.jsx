import { Container, Row, Col, Image } from "react-bootstrap";
import lab1 from "../../assets/images/lab1.jpg";
import lab2 from "../../assets/images/lab2.jpg";
import lab3 from "../../assets/images/lab3.jpg";

// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
const AboutLastSec = () => {
  return (
    <>
      <Container fluid className="bgwhite pt-5 pb-5">
        <Container>
          <Row>
            {[lab1, lab2, lab3].map((item) => (
              <Col md="4" className="headsummery pt-2" key={item}>
                <Image
                  src={item}
                  alt=""
                  style={{ width: "100%", height: "250px" }}
                ></Image>
                <h5 className="heading2 pt-4">AUTHANTIC FEEDSTOCK</h5>
                <div className="content">
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 Contrary to popular belief,
                    Lorem Ipsum is not simply random text. It has roots in a
                    piece of classical Latin literature from 45 BC, making it
                    over 2000
                  </p>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 Contrary to popular belief,
                    Lorem Ipsum is not simply random text. It has roots in a
                    piece of classical Latin literature from 45 BC, making it
                    over 2000
                  </p>
                </div>
                <hr className="hrline" />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AboutLastSec;
