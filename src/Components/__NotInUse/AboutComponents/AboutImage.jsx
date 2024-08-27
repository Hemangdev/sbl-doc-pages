import { Container, Row, Tab } from "react-bootstrap";
import AboutImageCat from "./AboutImageCat";
import AboutImages from "./AboutImages";

const AboutImage = () => {
  return (
    <Container className="pb-5 bgwhite">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row style={{ height: "100%" }}>
          <AboutImageCat></AboutImageCat>
          <AboutImages></AboutImages>
        </Row>
      </Tab.Container>
    </Container>
  );
};
export default AboutImage;
