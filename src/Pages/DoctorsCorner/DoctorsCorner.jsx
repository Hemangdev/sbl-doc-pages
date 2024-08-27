import React from 'react';
import './doctorCorner.css';
import MetaTags from '../../Components/MetaTags';
import { toast } from 'react-toastify';
import AxiosHelper from '../../helper/AxiosHelper';
import InstaFollow from '../../Components/InstaFollow';
import Service from '../../Components/Service';
import { useEffect, useState } from 'react';
import SubHeader from '../../Components/SubHeader';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Images import here
import img1 from '../../image/doctor-assests/1.png';
import img2 from '../../image/doctor-assests/2.png';
import img3 from '../../image/doctor-assests/3.png';
import img4 from '../../image/doctor-assests/4.png';
import img5 from '../../image/doctor-assests/5.png';
import img6 from '../../image/doctor-assests/6.png';
import img7 from '../../image/doctor-assests/7.png';
import img8 from '../../image/doctor-assests/8.png';
import img9 from '../../image/doctor-assests/9.png';
import img10 from '../../image/doctor-assests/10.png';


const DoctorsCorner = () => {

    const doctorCornerData = [
        {
            id: 1,
            img: img1,
            title: 'Clinical Case Studies/Articles',
            desc: 'Explore detailed clinical case studies and articles that showcase real-world applications of homoeopathy. Learn from experienced practitioners as they share their insights, methodologies, and outcomes of their various treatments.',
            redirectTo: '/case-studies',
        },
        {
            id: 2,
            img: img2,
            title: 'Disease and Their Homoeopathic Approach',
            desc: 'Gain an in-depth understanding of different diseases and the corresponding homoeopathic approaches. This section provides comprehensive information on how homoeopathy can be effectively used to treat a wide range of medical conditions.',
            redirectTo: '/disease-details',
        },
        {
            id: 3,
            img: img3,
            title: 'Homoeopathic Pharmacy',
            desc: 'This will be covering the preparation, dispensing, and storage of homoeopathic remedies. Learn about the principles of homoeopathic pharmacology and the standards for maintaining remedy efficacy.',
            redirectTo: '',
        },
        {
            id: 4,
            img: img4,
            title: 'Homoeopathic Materia Medica',
            desc: 'This will include the properties, symptoms, and uses of various homoeopathic remedies in detail. This is essential for understanding the therapeutic potential and applications of homoeopathic medicines.',
            redirectTo: '/homeopathic-materia',
        },
        {
            id: 5,
            img: img5,
            title: 'Organon of Medicine',
            desc: '“The Organon of Medicine” was written by Dr. Samuel Hahnemann. This section provides insights into the principles, philosophy, and methodologies that underpin homoeopathic practice.',
            redirectTo: '/organon-medicines',
        },
        {
            id: 6,
            img: img6,
            title: 'Clinical Examination: A Step-by-Step Guide ',
            desc: 'The doctors will learn how to perform thorough clinical examinations with this step-by-step guide. This resource helps practitioners conduct accurate assessments and diagnosis, which are crucial for effective homoeopathic treatment.',
            redirectTo: '',
        },
        {
            id: 7,
            img: img7,
            title: 'Different Homoeopathic Repertories ',
            desc: 'This section will provide insight into various homoeopathic repertories and also will help doctors and students how to use them effectively in clinical practice. This section covers repertorization techniques and the selection of an appropriate remedy based on patient’s symptoms.',
            redirectTo: '',
        },
        {
            id: 8,
            img: img8,
            title: 'Doctor’s Quiz of the Month',
            desc: 'Engage with a monthly quiz designed for doctors to test and expand their knowledge of homoeopathy. These quizzes cover a range of topics and help practitioners stay updated with the latest advancements and best practices.',
            redirectTo: '/doctor-quiz',
        },
        {
            id: 9,
            img: img9,
            title: 'Homoeo Updates',
            desc: 'Doctors will be informed of the latest updates in the field of homoeopathy. This section provides news, research findings, upcoming events, and other relevant information to keep practitioners current with the ongoing developments in homoeopathy.',
            redirectTo: '/homeo-updates',
        },
        {
            id: 10,
            img: img10,
            title: 'The Journey of a Doctor',
            desc: 'Read inspiring stories and experiences of homoeopathic doctors from around the world. This section highlights their professional journeys, challenges faced, and the impact of homoeopathy on their patients and communities.',
            redirectTo: '/doctor-details',
        },
    ]

    const [data, setData] = useState({
        cms_detail: {
            cms_group: "",
            name: "",
            cms_title: "",
            meta_title: "",
            meta_keyword: "",
            meta_description: "",
            cms_contant: "",
            image: "",
        },
        cms: [],
        company: [],
        certified: "",
        instafeed: []
    })

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData("aboutcompany");
            if (data.status === true) {
                setData(data.data)
            } else {
                toast.error(data.message);
            }
        })();
    }, []);
    return (
        <>
            {/* <MetaTags data={{ title: data?.cms_detail?.cms_group }} /> */}

            {/* <SubHeader heading={data?.cms_detail?.cms_group} backgroundImage={data?.cms_detail?.image}></SubHeader> */}
            <Banner title="Doctor's Corner" />

            <Container>
                <Row className='mb-5 mt-5'>



                    <div className='mainDiv' >
                        {
                            doctorCornerData.map((item, index) => {
                                return <CardBody
                                    key={index}
                                    title={item.title}
                                    desc={item.desc}
                                    img={item.img}
                                    redirect={item.redirectTo}
                                />
                            })
                        }
                    </div>
                    <Col>
                        <div className='side-nav shadow-lg pb-4'>
                            <h4 className='side-nav-heading'>Recent Posts
                                <div className='underline'></div>
                            </h4>

                            <div className=''>
                                {
                                    doctorCornerData.map((item, id) => {
                                        return <li
                                            href={item.redirectTo}
                                            key={item.id}
                                            className='list-nav'

                                        >
                                            {item.title}
                                        </li>
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                </Row>


            </Container>




            <InstaFollow />

            <Service feeds={data?.instafeed} />
        </>
    )
}

export default DoctorsCorner;




export const CardBody = ({ title, desc, img, redirect }) => {
    console.log(
        'hello world'
    );
    return (

        <div className='CardBody shadow mt-4'>
            <img className='doctor-corner-img' src={img} alt="doctor-corner-img" />
            <div className='card-text'>
                <h1 style={{ color: '#4065af' }} className='card-heading'>{title}</h1>
                <p style={{ color: '#3c4043', fontWeight: '500' }} className='card-para'>{desc}</p>
                <Link className='redirect-link' style={{ color: 'black', paddingTop: '12px', textDecoration: 'none' }} to={redirect}>Read more</Link>
            </div>


        </div>
    )
}

export const Banner = ({ title }) => {
    return (
        <div className='bannerBody'>
            <h1 className='bannerHeading'>{title}</h1>
        </div>
    )
}