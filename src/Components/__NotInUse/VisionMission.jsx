import {  Container,Row,Col ,Image} from 'react-bootstrap';


import vissioimage from '../assets/images/vission.png';

const VisionMission = () => {
  return (
    <>
    <Container fluid className='bgtheme'>
        <Container className='container'>
        <div className='abouthome'>
          <Row className='row pt-4 pb-4'>
              <Col md='6'>
                  <h2> VISION  MISSION </h2>
                  <hr/>
                  <Image src={vissioimage} alt='vission'  style={{width:'70%'}}></Image>
              </Col>
            
              <Col md='6'>
                <div className=''>
                  <h3>OUR VISION </h3>
                  <p >simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since
                      the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <hr style={{height:'1px'}}/>
                <div className='pt-3'>
                  <h3>OUR MISSION </h3>
                  <p >simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since
                      the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>
                </div>
                <hr style={{height:'1px'}}/>
              </Col>
            </Row>
          </div> 
        </Container>
    </Container>
    </>
  )
}

export default VisionMission

