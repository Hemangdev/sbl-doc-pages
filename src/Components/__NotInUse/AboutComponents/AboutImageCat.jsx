import { Nav,Col } from 'react-bootstrap';

const AboutImageCat = () => {
  return (
    <>
    <Col sm={3} className="abutimagescat">
        <Nav variant="pills" className="flex-column">
        <Nav.Item>
            <Nav.Link eventKey="first">Haridwar Unit1 <i className='fa-solid fa-caret-right'></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="second">Haridwar Unit2 <i className='fa-solid fa-caret-right'></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="three">Haridwar Unit3 <i className='fa-solid fa-caret-right'></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="four">Haridwar Unit4 <i className='fa-solid fa-caret-right'></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="five">Haridwar Unit5 <i className='fa-solid fa-caret-right'></i></Nav.Link>
        </Nav.Item>
        </Nav>
    </Col>
    </>
  )
}

export default AboutImageCat