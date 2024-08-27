import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import AxiosHelper from '../helper/AxiosHelper'
import { hideLoader, showLoader } from '../helper/LoaderHelper'
import MetaTags from '../Components/MetaTags'

const CertificatePage = () => {

    const [data, setData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const email = useRef();

    const submitForm = async () => {
        showLoader()
        const { data } = await AxiosHelper.downloadFile("/certificate-download", {email: email.current.value});
        console.log(data);
        if (data.type === 'application/pdf') {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sbl-certificate.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Clean up the URL object
            window.URL.revokeObjectURL(url);
            hideLoader();
        }else{
            hideLoader();
            toast.error("Invalid input / record not found.")
        }
    }

    return (
        <>
        <MetaTags data={{title: 'Certificates'}} />
        <div className='container'>
            <div className="row my-4">
                <div className="col-md-12">
                    <h1 className='fs-2 fw-bold text-green'>Certificates</h1>
                    <p>Download certificate of webinar / seminar / other participation.</p>
                </div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <input type='text' className='form-control' name="email" placeholder='Email' ref={email} />
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-success mx-1 min-w-150" onClick={submitForm} >Download</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CertificatePage;