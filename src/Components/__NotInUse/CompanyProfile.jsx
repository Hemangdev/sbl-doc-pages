import {  Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import video from '../assets/video/video.mp4';


const CompanyProfile = () => {

  return (
    <>
    <Container fluid className='bgabouttheme'>
        <Container className='container'>
        <div className='abouthome'>
          <Row className='row pt-5 pb-5'>
              <Col md='6'>
                  <h2> COMPANY PROFILE</h2>
                  <hr/>
                  <p >simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry\'s standard dummy text ever since
                      the 1500s, when an unknown printer took a galley of type and scrambled 
                      it to make a type specimen book.
                  </p>
                  <p >simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry\'s standard dummy text ever since
                      the 1500s, when an unknown printer took a galley of type and scrambled 
                      it to make a type specimen book.
                  </p>
                  <p >simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry\'s standard dummy text ever since
                      the 1500s.
                  </p>
                  <div className='pt-4'>
                    <Link to='#' className='text-white'>LEARN ABOUT HOMOEOPATHY</Link>
                  </div>
              </Col>
            
              <Col md='6' className='text-center'>
                 <video  controls>
                    <source src={video} type="video/mp4"/>
                    <source src={video} type="video/ogg"/>
                      Your browser does not support the video tag.
                  </video>
              </Col>
            </Row>
          </div> 
        </Container>
    </Container>
    </>
  )
}

export default CompanyProfile

