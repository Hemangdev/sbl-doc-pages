import { Container } from 'react-bootstrap';

const HomoeopathicApproch = ({ content = "" }) => {

  return (
    <>
      <Container fluid className='bgtheme'>
        <Container className='container' dangerouslySetInnerHTML={{ __html: content }}>

        </Container>
      </Container>
    </>
  )
}

export default HomoeopathicApproch

