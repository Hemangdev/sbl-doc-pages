import { Container } from 'react-bootstrap'

const SliderBottom = () => {
    return (
        <>
            <div className='topslidbg d-none d-lg-block'>
                <Container fluid="xl">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center border-bottom border-2">
                            <span className='fs-0 fw-bold'>SAFE</span>
                            <p className='mb-0 ms-4'>
                                Human Being respond best to natural<br></br> medicines rather than chemical substances.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className='mb-0'>
                                <span className='fs-2 fw-bold'>SBL HOMOEOPATHIC PRODUCTS</span>
                                <br />
                                <span className='fs-5'>are safe for all age groups</span>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default SliderBottom