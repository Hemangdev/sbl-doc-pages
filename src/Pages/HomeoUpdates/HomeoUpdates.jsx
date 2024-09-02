import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import '../Toolbar.css'
import pdf1 from './PdfData/homeo-pdf-1.pdf';


const homeoUpdates = [
    {
        id: 1,
        title: 'Homeo Updates',
        img:'https://plus.unsplash.com/premium_photo-1661425502756-4cee84bedbfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWVvcGF0aHklMjAlMjBuZXdzfGVufDB8fDB8fHww',
        pdf1: pdf1
    },
    {
        id: 2,
        title: 'Homeopathy in Pediatrics',
        img:'https://plus.unsplash.com/premium_photo-1671098088734-8b8532731aef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1lZGljaW5lJTIwbmV3c3xlbnwwfHwwfHx8MA%3D%3D',
        pdf1: pdf1
    },
    {
        id: 3,
        title: 'Homeopathy vs. Placebo',
        img:'https://plus.unsplash.com/premium_photo-1672759455415-34366f0a658a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lZGljaW5lJTIwbmV3c3xlbnwwfHwwfHx8MA%3D%3D',
        pdf1: pdf1
    },
    {
        id: 4,
        title: 'Integrative Medicine and Homeopathy',
        img:'https://images.unsplash.com/photo-1509789129199-7c90e936483a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG1lZGljaW5lJTIwbmV3c3xlbnwwfHwwfHx8MA%3D%3D',
        pdf1: pdf1
    },


]

const HomeoUpdates = () => {

    const [selectPdf, setSelectPdf] = useState(homeoUpdates[0])

    const handleClickChange = (pdf) => {
        setSelectPdf(pdf)
    };

    return (
        <>
            <Banner title='Homeo Updates' />
            <Container>
                <Row className='mb-5 mt-5'>
                    {/* <div className='mainDiv'>
                    {homeoUpdates.map((study, index) => (
                                <div key={index} className='case-study-item mb-5'>
                                    <h5 style={{color:'#4065af'}}>{selectPdf.title}</h5>
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
                                            <button style={{backgroundColor:'#4065af',color:'white'}} className='btn'>View Full PDF</button>
                                        </a>
                                        <a href={selectPdf.pdf1} download>
                                            <button style={{backgroundColor:'#1da827',color:'white'}} className='btn  ml-2'>Download PDF</button>
                                        </a>
                                    </div>
                                </div>
                            ))}

                    </div> */}
                    {/* <Col>
                        <div className='side-nav shadow-lg pb-4'>
                            <h4 className='side-nav-heading'>Similar Updates
                                <div className='underline'></div>
                            </h4>

                            {
                                homeoUpdates.map((item, id) => {
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

                    {homeoUpdates.map((item, index) => {
                        return <div key={index} className='cardBox'>
                            <a style={{ textDecoration: 'none' }} href={item.pdf1} target='_blank' rel="noreferrer">
                            <img style={{ borderRadius: '20px',width:'300px',height:'200px',objectFit:'cover' }} src={item.img} alt="" />
                                <h3 className='cardTitle mt-4'>{item.title}</h3>
                            </a>
                        </div>
                    })}

                </Row>

            </Container>


        </>
    )
}

export default HomeoUpdates;







export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
        </div>
    )
}