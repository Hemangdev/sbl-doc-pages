import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import AxiosHelper from "../../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import CountryCodes from "../../constant/CountryCodes.json"
import MetaTags from "../../Components/MetaTags";
const public_path = process.env.REACT_APP_PUBLIC_URL

const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

const mobileSchema = Yup.object().shape({
    mcode: Yup.string().required(),
    mobile: Yup.string()
        .when('mcode', (mcode) => {
            return mcode === '+91' ? Yup.string().max(15).required("Please enter mobile number.").matches(phoneRegExp, "Phone number is not valid") : Yup.string().max(15).required("Please enter mobile number.").min(10);
        }),
});

const otpSchema = Yup.object().shape({
    motp: Yup.string().required("Please enter OTP.")
        .matches(/^[0-9]+$/, "Must be only digits")
        .test('len', 'Must be exactly 4 characters', val => val.length === 4)
});



const ForgotPassword = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({})
    const [showOtp, setShowOtp] = useState(false)

    localStorage.removeItem('entered_mobile')
    localStorage.removeItem('entered_otp')

    return (
        <>
        <MetaTags data={{title: 'Forgot Password'}} />
        <Container fluid className="pt-5 bgwhite">
            <Container className="login-form">
                <Row className="d-flex justify-content-center text-center">
                    <h3 className="head">Forgot Password </h3>
                </Row>
                <Row className="pt-5 pb-5">
                    <Formik
                        initialValues={{ mobile: "", motp: "", mcode: "+91", otp_verification: true }}
                        validationSchema={showOtp ? otpSchema : mobileSchema}
                        onSubmit={(values) => {
                            (async () => {
                                if (showOtp) {
                                    var { data } = await AxiosHelper.postData("resetpassword", values);
                                    if (data.matched === true) {
                                        localStorage.setItem('entered_otp', values.motp)
                                        localStorage.setItem('entered_mobile', values.mobile)
                                        navigate(`${public_path}/reset-password`)
                                    }
                                    else {
                                        toast.error(data.message);
                                    }
                                }
                                else {
                                    var { data } = await AxiosHelper.postData("forgotpassword", values);
                                    if (data.status === true) {
                                        setShowOtp(data.data);
                                        toast.success(data.message);

                                    }
                                    else {
                                        setError(data.error)
                                        toast.error(data.message);
                                    }
                                }
                            })();
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="col-md-6 mx-auto">
                                <Row>
                                    {
                                        !showOtp ?
                                            <>
                                                <FloatingLabel controlId="floatingInput" label="Country Code" className="mb-3 col-md-3 fild" >
                                                    <Field as="select" name="mcode" className="form-control">
                                                        {CountryCodes?.map((item, i) => (
                                                            <option key={i} value={item?.dial_code}>{item?.dial_code}</option>
                                                        ))}
                                                    </Field>
                                                    <small className="text-danger">{error?.mcode?.[0] ? error?.mcode?.[0] : <ErrorMessage name="mcode" />}</small>
                                                </FloatingLabel>
                                                <FloatingLabel controlId="floatingInput" label="Mobile No." className="mb-3 col-md-9 fild" >
                                                    <Field
                                                        type="text"
                                                        placeholder="Mobile No."
                                                        name="mobile"
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{error?.mobile?.[0] ? error?.mobile?.[0] : <ErrorMessage name="mobile" />}</small>
                                                </FloatingLabel>
                                            </>
                                            :
                                            <FloatingLabel controlId="floatingInput" label="OTP" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
                                                <Field
                                                    type="text"
                                                    placeholder="OTP."
                                                    name="motp"
                                                    className="form-control"
                                                    autoComplete="off"
                                                />
                                                <small className="text-danger">{error?.motp?.[0] ? error?.motp?.[0] : <ErrorMessage name="motp" />}</small>
                                            </FloatingLabel>

                                    }
                                    <Col md="12" className="sbt-btn p-2">
                                        <Button className="submitbtn" variant="primary" type="submit"> {showOtp ? 'Submit OTP' : 'Request OTP'}  </Button>
                                        <Link className="text-green ms-2" to="/login">Back to Login</Link>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Row>
            </Container>
        </Container>
        </>
    )
}

export default ForgotPassword