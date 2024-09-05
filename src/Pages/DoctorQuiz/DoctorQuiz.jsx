import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import pdf1 from './Data/doc-quiz-1.pdf'
import whatsappIcon from './Data/whatsapp.png'
import realImg from "./Doctor's Quiz of the Month september post.jpg"
import '../Toolbar.css'





const doctorQuiz = [
    {
        id: 1,
        title: 'September',
        img: realImg,
        pdf1: pdf1
    },

]

const DoctorQuiz = () => {
    // const [selectPdf, setSelectPdf] = useState(doctorQuiz[0])

    // const handleClickChange = (pdf) => {
    //     setSelectPdf(pdf)
    // };


    return (
        <>
            <Banner title='Doctor’s Quiz of the Month' />
            <Container>
                <Row className='mb-5 mt-5'>
                    {/* <div className='mainDiv'>
                        {doctorQuiz.map((study, index) => (
                            <div key={index} className='case-study-item mb-5'>
                                <h5 style={{ color: '#4065af' }}>{selectPdf.title}</h5>
                                <div className='pdf-preview'>
                                    <iframe
                                        src={`${selectPdf.pdf1}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                        width="100%"
                                        height="1000px"
                                        style={{ border: 'transparent !important' }}
                                        title={selectPdf.title}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <a href={selectPdf.pdf1} target='_blank' rel='noopener noreferrer'>
                                        <button style={{ backgroundColor: '#4065af', color: 'white' }} className='btn'>View Full PDF</button>
                                    </a>
                                    <a href={selectPdf.pdf1} download>
                                        <button style={{ backgroundColor: '#1da827', color: 'white' }} className='btn  ml-2'>Download PDF</button>
                                    </a>
                                </div>
                            </div>
                        ))}

                    </div> */}



                    {/* <Col>
                        <div className='side-nav shadow-lg pb-4'>
                            <h4 className='side-nav-heading'>Similar Quiz
                                <div className='underline'></div>
                            </h4>

                            {
                                doctorQuiz.map((item, id) => {
                                    return <li
                                        key={item.id}
                                        className='list-nav'
                                        onClick={() => handleClickChange(item)}
                                    >
                                        {item.title}
                                    </li>
                                })
                            }
                        </div>
                    </Col> */}


                    {doctorQuiz.map((item, index) => {
                        return <div key={index} className='cardBox'>
                            <a style={{ textDecoration: 'none' }} href={item.pdf1} target='_blank' rel="noreferrer">
                            <img style={{ borderRadius: '20px',width:'270px',height:'180px',objectFit:'cover' }} src={item.img} alt="" />
                                <h3 className='cardTitle mt-4'>{item.title}</h3>
                            </a>
                        </div>
                    })}
                </Row>

            </Container>





        </>
    )
}

export default DoctorQuiz;



export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
            <h6 style={{gap:'10px'}} className='subBannerHeading d-flex'>
                Submit your answer on
                <a
                    href="https://wa.me/918851654420"
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'inherit' }} rel="noreferrer" // Inline style to remove underline and keep text color
                >

                    <div className='d-flex justify-content-center'>
                        <img src={whatsappIcon} alt="" />
                        <span> 8851654420</span>
                    </div>
                </a>
            </h6>
        </div>
    )
}