import { Container } from "react-bootstrap";

const AboutHome = ({ about = "" }) => {
  return (
    <>
      <Container fluid className="bgwhite">
        <Container dangerouslySetInnerHTML={{ __html: about }}>

        </Container>
      </Container>
    </>
  );
};

export default AboutHome;
