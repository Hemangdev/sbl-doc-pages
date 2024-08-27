import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AxiosHelper from '../helper/AxiosHelper'
import { hideLoader, showLoader } from '../helper/LoaderHelper'
import MetaTags from '../Components/MetaTags'

const DealerLocator = () => {

    const [data, setData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [states, setStates] = useState([])
    const [city, setCity] = useState([])
    const [dataForm, setDataForm] = useState({
        state_id: "", city_id: "",
    })

    const updateData = e => {
        setDataForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const submitForm = async () => {
        if (dataForm.state_id && dataForm.city_id) {
            showLoader()
            const { data } = await AxiosHelper.postData("/dealerlocator", dataForm);
            if (data.status === true) {
                setData(data.data);
                setSubmitted(true)
                hideLoader()
            }
            else {
                setSubmitted(true)
                toast.error(data.message)
                hideLoader()
            }
        } else {
            toast.error("Please select State and City First.")
        }
    }

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`getstate/99`);
            if (data.status === true) {
                setStates(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);

    return (
        <>
        <MetaTags data={{title: 'Dealer Locator'}} />
        <div className='container'>
            <div className="row my-4">
                <div className="col-md-12">
                    <h1 className='fs-2 fw-bold text-green'>Dealer Locator</h1>
                    <p>To locate the Dealer closest to you, go to state then go to city and reach to your nearest Dealer.</p>
                </div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <select className="form-select" name="state_id" id="state_id" value={dataForm.state_id} onChange={async (e) => {
                                        updateData(e)
                                        var { data } = await AxiosHelper.getData(`getcity/${e.target.value || 0}`);
                                        if (data?.status === true) {
                                            setCity(data?.data)
                                        }
                                    }}>
                                        <option value="">Select State</option>
                                        {states.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-select" name="city_id" id="city_id" value={dataForm.city_id} onChange={(e) => updateData(e)}>
                                        <option value="">Select City</option>
                                        {city.map((item, i) => <option key={i} value={item.id}>{item.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-success mx-1 min-w-150" onClick={submitForm} >Submit</button>
                                    <button className="btn btn-success mx-1 min-w-150" onClick={() => {
                                        setData([])
                                        setCity([])
                                        setDataForm({ state_id: "", city_id: "" })
                                    }}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    {submitted ? <div className="card mt-3">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className='text-success'>Dealer Name</th>
                                            <th scope="col" className='text-success'>Dealer Address</th>
                                            <th scope="col" className='text-success'>Dealer Phone</th>
                                            <th scope="col" className='text-success'>Dealer Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, i) => (
                                            <tr className="" key={i}>
                                                <th scope="row">{item.name}</th>
                                                <td>{item.address || '--'}</td>
                                                <td>{item.phone || '--'}</td>
                                                <td>{item.email || '--'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className='text-center text-danger mb-1'>{(data.length === 0 && dataForm.state_id && dataForm.city_id) ? "No Data Found" : null}</p>
                            </div>
                        </div>
                    </div> : <div className='my-4'></div>}
                </div>
            </div>
        </div>
        </>
    )
}

export default DealerLocator