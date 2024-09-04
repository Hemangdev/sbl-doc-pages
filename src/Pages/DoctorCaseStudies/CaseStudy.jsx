import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import pdf1 from './Case-studies/case-study-1.pdf'
import guidlines from './Authors- guidelines.pdf'


const caseStudies = [
    {
        id: 1,
        title: 'Management of Myositis Ossificans with Homoeopathy',
        img:'https://plus.unsplash.com/premium_photo-1664301747246-ca55593015f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FzZSUyMHN0dWR5fGVufDB8fDB8fHww',
        pdf1: pdf1
    },
    
     
     

]

const CaseStudy = () => {

    // const [selectPdf, setSelectPdf] = useState(caseStudies[0])

    // const handleClickChange = (pdf) => {
    //     setSelectPdf(pdf)
    // };

    return (
        <>
            <Banner title='Clinical Case Studies/Articles' />
            <Container>
                <Row className='mb-5 mt-5'>
                    {/* <div className='mainDiv'>
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

                    </div> */}


                    {/* new code for UI as per changes  */}
                    {caseStudies.map((item, index) => {
                        return <div key={index} className='cardBox'>
                            <a style={{textDecoration:'none'}} href={item.pdf1} target='_blank' rel="noreferrer">
                            <img style={{ borderRadius: '20px',width:'200px',height:'180px',objectFit:'cover' }} src={item.img} alt="" />
                                <h3 className='cardTitle mt-4'>{item.title}</h3>
                            </a> 
                        </div>
                    })}
                     

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
            <h6 className='subBannerHeading'><a target='_blank' href= {guidlines} rel="noreferrer">Guidelines for Article Submission</a></h6>
        </div>
    )
}