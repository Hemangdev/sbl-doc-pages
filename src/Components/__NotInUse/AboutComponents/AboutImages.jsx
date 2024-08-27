import { Tab, Col, Image } from "react-bootstrap";
import sbl1 from "../../assets/images/sbl1.jpg";
import sbl2 from "../../assets/images/sbl2.jpg";
import sbl3 from "../../assets/images/sbl3.jpg";
const AboutImages = () => {
  return (
    <>
      <Col sm={9} className="aboutimg">
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <Image src={sbl1} alt="sbl1"></Image>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <Image src={sbl2} alt="sbl1"></Image>
          </Tab.Pane>
          <Tab.Pane eventKey="three">
            <Image src={sbl3} alt="sbl1"></Image>
          </Tab.Pane>
          <Tab.Pane eventKey="four">
            <Image src={sbl1} alt="sbl1"></Image>
          </Tab.Pane>
          <Tab.Pane eventKey="five">
            <Image src={sbl2} alt="sbl1"></Image>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </>
  );
};

export default AboutImages;
