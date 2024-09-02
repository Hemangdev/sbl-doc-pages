/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import pdf1 from './Journey of Dr. R.N Wahi.pdf'
import './DoctorDetails.css'

const DoctorsDetails = () => {

    const doctorsList = [
        {
            id: 1,
            title: 'Journey Of Doctor R.N Wahi',
            img:'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D',
            pdf1: pdf1,
        },
        {
            id: 2,
            title: 'Journey Of Dr. Randeep Guleria',
            img:'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D',
            pdf1: pdf1,
        },
        {
            id: 3,
            title: 'Journey Of Dr. Sudhansu Bhattacharyya',
            img:'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D',
            pdf1: pdf1,
        },
        {
            id: 4,
            title: 'Journey Of Dr. B. Soma Raju',
            img:'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnN8ZW58MHx8MHx8fDA%3D',
            pdf1: pdf1,
        },



    ]



    // State variable holding the value when the content is changing


    // const [selectedDoctor, setselectedDoctor] = useState(docData[0])



    // Function to change the values when clicked


    // const handleClickChange = (doctor) => {
    //     setselectedDoctor(doctor)
    // };



    return (
        <>
            <Banner title='Journey Of Doctor' />

            <Container>
                <Row className='mb-5 mt-5'>
                    {/* right div */}

                    {/* <div className='doc-detail-para' >
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
                    </div> */}
                    {doctorsList.map((item, index) => {
                        return <div key={index} className='cardBox'>
                            <a style={{ textDecoration: 'none' }} href={item.pdf1} target='_blank' rel="noreferrer">
                            <img style={{ borderRadius: '20px', width: '300px', height: '200px', objectFit: 'cover' }} src={item.img} alt="" />
                                <h3 className='cardTitle mt-4'>{item.title}</h3>
                            </a>
                        </div>
                    })}


                    {/* left-side bar menu */}
                    {/* <Col>
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
                    </Col> */}
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
            <h6 className='subBannerHeading'><a href="https://sbl-doc-pages.vercel.app/static/media/case-study-1.0f00719b5f2f754dcc01.pdf">Guidelines for Article Submission</a></h6>
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
