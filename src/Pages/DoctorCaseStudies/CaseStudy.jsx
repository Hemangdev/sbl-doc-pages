import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import pdf1 from './Case-studies/case-study-1.pdf'


const caseStudies = [
    {
        id: 1,
        title: 'Management of Myositis Ossificans with Homoeopathy',
        pdf1: pdf1
    },
    
]

const CaseStudy = () => {

    const [selectPdf,setSelectPdf] = useState(caseStudies[0])

    const handleClickChange = (pdf) => {
        setSelectPdf(pdf)
    };

    return (
        <>
            <Banner title='Clinical Case Studies/Articles' />
            <Container>
                <Row className='mb-5 mt-5'>
                    <div className='mainDiv'>
                    {caseStudies.map((study, index) => (
                                <div key={index} className='case-study-item mb-5'>
                                    <h5 style={{color:'#4065af'}}>{selectPdf.title}</h5>
                                    <div  className='pdf-preview'>
                                        <iframe 
                                            src={`${selectPdf.pdf1}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                            width="100%"
                                            height="1000px"
                                            style={{ border: 'transparent !important', backgroundColor:'white !important' }}
                                            title={selectPdf.title}
                                        />
                                    </div>
                                    <div className='mt-3 bottomButtons'>
                                        <a href={selectPdf.pdf1} target='_blank' rel='noopener noreferrer'>
                                            <button style={{backgroundColor:'#4065af',color:'white'}} className='btn'>View Full PDF</button>
                                        </a>
                                        <a href={selectPdf.pdf1} download>
                                            <button style={{backgroundColor:'#1da827',color:'white'}} className='btn  ml-2'>Download PDF</button>
                                        </a>
                                    </div>
                                </div>
                            ))}

                    </div>
                    <Col>
                        <div className='side-nav shadow-lg pb-4'>
                            <h4 className='side-nav-heading'>Case Studies
                                <div className='underline'></div>
                            </h4>

                            {
                                caseStudies.map((item, id) => {
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
                    </Col>

                </Row>

            </Container>


        </>
    )
}

export default CaseStudy;







export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
        </div>
    )
}