import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import pdf1 from './DataPdf/disease-1.pdf';
import '../Toolbar.css'



// Data Array
const diseaseData = [
    {
        id: 1,
        title: "Parkinson's Disease",
        img:'https://media.istockphoto.com/id/669895948/photo/scientist-holding-pill-bottle-and-digital-tablet.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q8J_Y-rQbzZXKnTXBqtDVLqYjLkxMGyRNV02oVxBtlo=',
        pdf1: pdf1

    },
    {
        id: 2,
        title: 'Allergic Rhinitis (Hay Fever)',
        img:'https://images.unsplash.com/photo-1564316911608-6b51e3a3cf3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbWVvcGF0aHl8ZW58MHx8MHx8fDA%3D',
        pdf1: pdf1

    },
    {
        id: 3,
        title: 'Migraine Headaches',
        img:'https://images.unsplash.com/photo-1676852148076-7a92002419f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZW9wYXRoeXxlbnwwfHwwfHx8MA%3D%3D',
        pdf1: pdf1

    },
    {
        id: 4,
        title: 'Anxiety and Stress Disorders',
        img:'https://images.unsplash.com/photo-1564683214968-fa3d0c31f23c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWVvcGF0aHl8ZW58MHx8MHx8fDA%3D',
        pdf1: pdf1

    },
    
]



const Diseases = () => {

    // const [selectPdf, setSelectPdf] = useState(diseaseData[0])

    // const handleClickChange = (pdf) => {
    //     setSelectPdf(pdf)
    // };
    return (
        <>
            <Banner title="Disease and Their Homoeopathic Approach" />
            <Container>

                <Row className='mb-5 mt-5'>
                    {/* <div className='mainDiv'>
                        {diseaseData.map((study, index) => (
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
                            <h4 className='side-nav-heading'>Similar Disease
                                <div className='underline'></div>
                            </h4>

                            {
                                diseaseData.map((item, id) => {
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

                    {diseaseData.map((item, index) => {
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

export default Diseases;


// Banner 
export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
        </div>
    )
}