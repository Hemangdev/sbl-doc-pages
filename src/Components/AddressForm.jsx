import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Button } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Select2 from "../Components/include/Select2"

const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Please enter contact person name."),
    address_1: Yup.string().min(2).max(100).required("Please enter first address."),
    address_2: Yup.string().min(2).max(100).required("Please enter second address."),
    country_id: Yup.number().min(1, "Please select country.").required("Please select country."),
    state_id: Yup.number().min(1, "Please select state.").required("Please select state."),
    city_id: Yup.number().min(1, "Please select city.").required("Please select city."),
    postcode: Yup.string().min(2).max(10).required("Please enter postal code."),
    mobile: Yup.string().typeError("Please enter mobile number.").min(10, 'Mobile must be at least 10 characters').max(10, 'Mobile must be at most 10 characters').required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
});


const AddressForm = ({ afterAdd }) => {

    const [error, setError] = useState({})
    const [countries, setCountries] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])

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

    return (
        <Formik
            initialValues={{
                "name": "",
                "country_id": "",
                "state_id": "",
                "city_id": "",
                "postcode": "",
                "address_1": "",
                "address_2": "",
                "mobile": "",
            }}
            validationSchema={SignupSchema}
            enableReinitialize
            onSubmit={(values, { resetForm }) => {
                (async () => {

                    var { data } = await AxiosHelper.postData("addaddress", values);
                    if (data?.status === true) {
                        afterAdd()
                        toast.success(data?.message);
                    }
                    else {
                        setError(data?.data)
                        toast.error(data?.message);
                    }
                })();
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className="col-md-12 px-3">
                    <Row>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">Contact Person Name</label>
                                <Field type="text" name="name" className="form-control" placeholder="Contact Person Name" />
                                <small className="text-danger">{error?.name ? error?.name : <ErrorMessage name="name" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">Customer Mobile</label>
                                <Field type="number" name="mobile" className="form-control" placeholder="Customer Mobile" />
                                <small className="text-danger">{error?.mobile ? error?.mobile : <ErrorMessage name="mobile" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">First Address</label>
                                <Field type="text" name="address_1" className="form-control" placeholder="First Address" />
                                <small className="text-danger">{error?.address_1 ? error?.address_1 : <ErrorMessage name="address_1" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">Second Address</label>
                                <Field type="text" name="address_2" className="form-control" placeholder="Second Address" />
                                <small className="text-danger">{error?.address_2 ? error?.address_2 : <ErrorMessage name="address_2" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">Country</label>
                                <Field name="country_id" label="Country" options={countries} component={Select2}
                                    onChangeCustom={async (value) => {
                                        setFieldValue('state_id', null)
                                        setFieldValue('city_id', null)
                                        var { data } = await AxiosHelper.getData(`getstate/${value.id}`);
                                        if (data.status === true) {
                                            setState(data.data)
                                        }
                                        else {
                                            toast.error(data.message);
                                        }
                                    }}
                                />
                                <small className="text-danger">{error?.country_id ? error?.country_id : <ErrorMessage name="country_id" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">State</label>
                                <Field name="state_id" label="State" options={state} component={Select2}
                                    onChangeCustom={async (value) => {
                                        setFieldValue('city_id', null)
                                        var { data } = await AxiosHelper.getData(`getcity/${value.id}`);
                                        if (data.status === true) {
                                            setCity(data.data)
                                        }
                                        else {
                                            toast.error(data.message);
                                        }
                                    }}
                                />
                                <small className="text-danger">{error?.state_id ? error?.state_id : <ErrorMessage name="state_id" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label fs-7">City</label>
                                <Field label="City" name="city_id" options={city} component={Select2} />
                                <small className="text-danger">{error?.city_id ? error?.city_id : <ErrorMessage name="city_id" />}</small>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mb-2">
                                <label className="form-label  fs-7">Postal Code</label>
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
    )
}

export default AddressForm