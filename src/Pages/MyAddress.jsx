import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import SubHeader from "../Components/SubHeader";
import ProfileMenus from "../Components/include/ProfileMenus";
import Select2 from "../Components/include/Select2"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCallback } from "react";
import MetaTags from "../Components/MetaTags";
const MySwal = withReactContent(Swal)

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Please enter contact person name."),
    address_1: Yup.string().min(2).max(100).required("Please enter Address Line 1."),
    address_2: Yup.string().min(2).max(100).required("Please enter Address Line 2."),
    country_id: Yup.number().min(1, "Please select country.").required("Please select country."),
    state_id: Yup.number().min(1, "Please select state.").required("Please select state."),
    city_id: Yup.number().min(1, "Please select city.").required("Please select city."),
    postcode: Yup.string().min(2).max(12).required("Please enter postal code."),
    mobile: Yup.string().typeError("Please enter mobile number.").min(10, 'Mobile must be at least 10 characters').max(10, 'Mobile must be at most 10 characters').required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
});


const MyAddress = () => {

    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [formType, setFormType] = useState('add')
    const [error, setError] = useState({})
    const [countries, setCountries] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])
    const [initialValues, setInitialValues] = useState({
        "name": "",
        "country_id": "",
        "state_id": "",
        "city_id": "",
        "postcode": "",
        "address_1": "",
        "address_2": "",
    })

    const getData = useCallback(async () => {
        var { data } = await AxiosHelper.postData(`address`);
        if (data.status === true || data.data?.length === 0) {
            setData(data.data)
        }
    }, [])


    useEffect(() => {
        getData();
    }, [getData]);

    useEffect(() => {
        (async () => {
            var { data } = await AxiosHelper.getData(`getcountry`);
            if (data.status === true) {
                setCountries(data.data)
            }
            else {
                toast.error(data.message);
            }
        })();
    }, []);

    const editData = async (val) => {
        var data = await AxiosHelper.getData(`getstate/${val.country_id}`);
        if (data?.data?.status === true) {
            setState(data?.data?.data)
        }
        else {
            toast.error(data?.data?.message);
        }


        var city = await AxiosHelper.getData(`getcity/${val.state_id}`);
        if (city?.data?.status === true) {
            setCity(city?.data?.data)
        }
        else {
            toast.error(city?.data?.message);
        }

        setFormType('edit')
        setInitialValues(val)
        setShow(true)
    }

    const deleteData = async (val) => {

        var { isConfirmed } = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (isConfirmed) {
            var { data } = await AxiosHelper.getData(`deleteaddress/${val}`);
            if (data?.status === true) {
                getData()
                toast.success(data?.message);
            }
            else {
                toast.error(data?.message);
            }

            setFormType('edit')
            setInitialValues(val)
        }
    }


    return (
        <>
            <MetaTags data={{ title: 'My Address Book' }} />
            <SubHeader heading="My Address Book" />
            <Container fluid className="pt-5">
                <Container className="login-form">
                    <Row className="pb-5">
                        <Col md={4} className="pe-4">
                            <ProfileMenus />
                        </Col>
                        <Col md={8} className="pe-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between text-center pb-3">
                                        <h3 className="head">My Address Book</h3>
                                        <span>
                                            <button onClick={() => {
                                                setInitialValues({
                                                    "name": "",
                                                    "country_id": "",
                                                    "state_id": "",
                                                    "city_id": "",
                                                    "postcode": "",
                                                    "address_1": "",
                                                    "address_2": "",
                                                    "mobile": "",
                                                });
                                                setFormType('add')
                                                setShow(true)
                                            }} className="btn btn-primary btn-sm"><i className="fa fa-plus me-1"></i>Add Address</button>
                                        </span>
                                    </div>
                                    <div className="row">
                                        {data.map((item, i) => (
                                            <div className="col-md-6" key={item?.id}>
                                                <div className={`bg-white card addresses-item mb-4 border shadow ${i === 0 && 'border-primary'}`}>
                                                    <div className="gold-members p-3">
                                                        <div className="media-body">
                                                            <p className="text-black">
                                                                {`${item.name}, ${item.mobile}, ${item.address_1}, ${item.address_2}, ${item?.city_name}, ${item?.state_name}, ${item?.country_name}, ${item?.postcode}`}
                                                            </p>
                                                            <p className="mb-0 mt-auto text-black font-weight-bold">
                                                                <button onClick={() => editData(item)} className="btn btn-link btn-sm text-decoration-none fw-bold text-primary mr-3">
                                                                    <i className="fa fa-edit" /> EDIT
                                                                </button>
                                                                <button onClick={() => deleteData(item?.id)} className="btn btn-link btn-sm text-decoration-none fw-bold text-danger">
                                                                    <i className="fa fa-trash" /> DELETE
                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {data.length === 0 && <h5 className='text-danger text-center my-2'>Not Address found</h5>}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Modal show={show} size="lg" centered onHide={() => setShow(false)}>
                <Modal.Header closeButton className="py-2">
                    <Modal.Title> <span className="text-capitalize">{formType}</span> Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        enableReinitialize
                        onSubmit={(values, { resetForm }) => {
                            (async () => {
                                setError({})

                                if (parseInt(values.country_id) === 99 && values.postcode) {
                                    var { data } = await AxiosHelper.postData(`/checkdelivery`, { postcode: values.postcode });
                                    if (data.status === false) {
                                        return setError({ postcode: "We can't deliver at this pin code." })
                                    }
                                }

                                var responce;
                                if (formType === "add") {
                                    responce = await AxiosHelper.postData("addaddress", values);
                                }
                                else if (formType === "edit") {
                                    responce = await AxiosHelper.postData(`updateaddress/${values.id}`, values);
                                }

                                if (responce?.data?.status === true) {
                                    getData()
                                    setShow(false)
                                    toast.success(responce?.data?.message);
                                }
                                else {
                                    setError(responce?.data?.data)
                                    toast.error(responce?.data?.message);
                                }
                            })();
                        }}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form className="col-md-12 px-3">
                                <Row>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">Contact Person Name <span className="text-danger">*</span></label>
                                            <Field type="text" name="name" className="form-control" placeholder="Contact Person Name" />
                                            <small className="text-danger">{error?.name ? error?.name : <ErrorMessage name="name" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">Customer Mobile <span className="text-danger">*</span></label>
                                            <Field type="number" name="mobile" className="form-control" placeholder="Customer Mobile" />
                                            <small className="text-danger">{error?.mobile ? error?.mobile : <ErrorMessage name="mobile" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">Address Line 1 <span className="text-danger">*</span></label>
                                            <Field type="text" name="address_1" className="form-control" placeholder="Address Line 1" />
                                            <small className="text-danger">{error?.address_1 ? error?.address_1 : <ErrorMessage name="address_1" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">Address Line 2 <span className="text-danger">*</span></label>
                                            <Field type="text" name="address_2" className="form-control" placeholder="Address Line 2" />
                                            <small className="text-danger">{error?.address_2 ? error?.address_2 : <ErrorMessage name="address_2" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">Country <span className="text-danger">*</span></label>
                                            <Field name="country_id" label="Country" options={countries} component={Select2}
                                                onChangeCustom={async (value) => {
                                                    if (value?.id !== undefined) {
                                                        setFieldValue('state_id', null)
                                                        setFieldValue('city_id', null)
                                                        var { data } = await AxiosHelper.getData(`getstate/${value.id}`);
                                                        if (data.status === true) {
                                                            setState(data.data)
                                                        }
                                                        else {
                                                            toast.error(data.message);
                                                        }
                                                    }
                                                }}
                                            />
                                            <small className="text-danger">{error?.country_id ? error?.country_id : <ErrorMessage name="country_id" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">State <span className="text-danger">*</span></label>
                                            <Field name="state_id" label="State" options={state} component={Select2}
                                                onChangeCustom={async (value) => {
                                                    if (value?.id !== undefined) {
                                                        setFieldValue('city_id', null)
                                                        var { data } = await AxiosHelper.getData(`getcity/${value.id}`);
                                                        if (data.status === true) {
                                                            setCity(data.data)
                                                        }
                                                        else {
                                                            toast.error(data.message);
                                                        }
                                                    }
                                                }}
                                            />
                                            <small className="text-danger">{error?.state_id ? error?.state_id : <ErrorMessage name="state_id" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label fs-7">City <span className="text-danger">*</span></label>
                                            <Field label="City" name="city_id" options={city} component={Select2} />
                                            <small className="text-danger">{error?.city_id ? error?.city_id : <ErrorMessage name="city_id" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="mb-2">
                                            <label className="form-label  fs-7">Postal Code <span className="text-danger">*</span></label>
                                            <Field type="text" name="postcode" className="form-control" placeholder="Postal Code" />
                                            <small className="text-danger">{error?.postcode ? error?.postcode : <ErrorMessage name="postcode" />}</small>
                                        </div>
                                    </Col>
                                    <Col md="12" className="sbt-btn p-2">
                                        <Button className="submitbtn" variant="primary" type="submit"> Update </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default MyAddress