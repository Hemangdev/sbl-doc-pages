import {  Container,Row,Col ,Image} from 'react-bootstrap';
import headimg from '../assets/images/bina.jpg';

const HeadDetail = () => {
  return (
    <>
    <Container fluid className='bgwhite pt-5 pb-5'>
    <Container>
      <Row>
        <Col md='4'>
            <Image src={headimg} alt='' style={{width:'80%'}}></Image>
            <Row>
              <Col md='12 themefont2 '>
                <h3> Dr. Beena Thomas</h3>
                <h4> (R & D Head)</h4>
              </Col>
            </Row>
        </Col>
        <Col md='8' className='headsummery'>
          <div className='heading'>Focus on Research & devlopment</div>
          <div className='content'>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
          </div>

          <div className='heading'>Standardization</div>
          <div className='content'>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
          </div>

          <div className='heading'>Upgration of Existing Products</div>
          <div className='content'>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
          </div>

          <div className='heading'>New Product Devlopment</div>
          <div className='content'>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
          </div>

          <div className='heading'>Focus on Research & devlopment</div>
          <div className='content'>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
          </div>

          
        </Col>
      </Row>
      <Row>
        <Col className='headsummery pt-4'>
            <div className='heading'>CLINICAL TRIALS</div>
            <div className='content'>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
              roots in a piece of classical Latin literature from 45 BC, making it over roots in a piece 
              of classical Latin literature from 45 BC, making it over roots in a piece of classical Latin 
              of classical Latin literature from 45 BC, making it over roots in a piece of classical Latin 
              literature from 45 BC, making it over literature from 45 BC, making it over 
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
            </div>
            <br/>
            <div className='heading'>NEW DRUG PROVING</div>
            <div className='heading'>HOMOEOPATHIC PATHOGENIC TESTING</div>
            <div className='content'>
              <p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
              <p> It has roots in a piece of  popular belief, <br/>
                  Latin literature from 45 BCpopular belief, <br/>
                  Contrary to popular belief, </p>
              <p>It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 
                 It has roots in a piece of classical Latin literature from 45 BC, making it over 2000  </p>
             
            </div>
        </Col>
      </Row>
    </Container>
    </Container>
    </>
  )
}

export default HeadDetail

