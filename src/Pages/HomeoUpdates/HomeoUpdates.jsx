import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import '../Toolbar.css'
import pdf1 from './PdfData/homeo-pdf-1.pdf';


const homeoUpdates = [
    {
        id: 1,
        title: 'HOMOEO UPDATES',
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
            <Banner title='Clinical Case Studies/Articles' />
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
                                <img style={{ borderRadius: '20px' }} src="https://placehold.co/300x200" alt="" />
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