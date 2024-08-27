import { Container, Row } from "react-bootstrap";
import OfficeDetail from "./OfficeDetail";
import OurOfficesList from "./OurOfficesList";
const OurOfficeSection = () => {
  return (
    <Container fluid className="pt-4 bgwhite">
      <Container>
        <Row>
          <OurOfficesList></OurOfficesList>
          <OfficeDetail></OfficeDetail>
        </Row>
      </Container>
    </Container>
  );
};

export default OurOfficeSection;
