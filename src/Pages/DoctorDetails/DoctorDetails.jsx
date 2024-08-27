/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { docData } from './DocData';

const DoctorsDetails = () => {
    // State variable holding the value when the content is changing
    const [selectedDoctor, setselectedDoctor] = useState(docData[0])



    // Function to change the values when clicked
    const handleClickChange = (doctor) => {
        setselectedDoctor(doctor)
    };



    return (
        <>
            <Banner title={`Journey of ${selectedDoctor.docName}`} />

            <Container>
                <Row className='mb-5 mt-5'>
                    {/* right div */}

                    <div className='mainDiv' >
                        {
                            docData.map((item, index) => {
                                return <DoctorBody
                                    docName={selectedDoctor.docName}
                                    docImg={selectedDoctor.docImg}
                                    imgAlt={selectedDoctor.imgAlt}
                                    line1={selectedDoctor.paraInfo1}
                                    line2={selectedDoctor.paraInfo2}
                                    line3={selectedDoctor.parInfo3}
                                    line4={selectedDoctor.paraInfo4}
                                />
                            })
                        }
                    </div>
                    {/* left-side bar menu */}
                    <Col>
                        <div className='side-nav shadow-lg pb-4'>
                            <h4 className='side-nav-heading'>Explore Doctors
                                <div className='underline'></div>
                            </h4>

                            <div className=''>
                                {
                                    docData.map((item, id) => {
                                        return <li
                                            key={item.id}
                                            className='list-nav'
                                            onClick={() => handleClickChange(item)}
                                        >
                                            {item.docName}
                                        </li>
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </Row>


            </Container>




        </>
    )
}

export default DoctorsDetails;


// Top Banner
export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
        </div>
    )
}


// Doctor details body 
export const DoctorBody = ({ docName, line1, line2, line3, line4, docImg, imgAlt }) => {
    return (
        <div className=''>
            <h1 style={{ color: '#4065af' }}>{docName}</h1>
            <div className='row'>
                <p className='col-lg-6'>{line1}</p>
                <img className='col-lg-6' src={docImg} alt={imgAlt} />
            </div>

            <p>{line2}</p>
            <p>{line3}</p>
            <p>{line4}</p>
        </div>
    )
}
