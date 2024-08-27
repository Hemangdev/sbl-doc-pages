import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import AxiosHelper from "../../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import MetaTags from "../../Components/MetaTags";
const public_path = process.env.REACT_APP_PUBLIC_URL

const mobileSchema = Yup.object().shape({
    password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please enter password."),
    password_confirmation: Yup.string().min(2).max(50).required().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const ResetPassword = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({})
    useEffect(() => {
        var mobile = localStorage.getItem('entered_mobile')
        var otp = localStorage.getItem('entered_otp')
        if (mobile == null || otp == null) {
            navigate(`${public_path}/forgot-password`)
        }
    }, [navigate])

    return (

        <>
        <MetaTags data={{title: 'Reset Password'}} />
        <Container fluid className="pt-5 bgwhite">
            <Container className="login-form">
                <Row className="d-flex justify-content-center text-center">
                    <h3 className="head">Reset Password </h3>
                </Row>
                <Row className="pt-5 pb-5">
                    <Formik
                        initialValues={{
                            mobile: localStorage.getItem('entered_mobile'),
                            motp: localStorage.getItem('entered_otp'),
                            password: "",
                            password_confirmation: ""
                        }}
                        validationSchema={mobileSchema}
                        onSubmit={(values) => {
                            (async () => {
                                var { data } = await AxiosHelper.postData("resetpassword", values);
                                if (data.status === true) {
                                    localStorage.removeItem('entered_mobile')
                                    localStorage.removeItem('entered_otp')
                                    toast.success(data.message);
                                    navigate(`${public_path}/login`)
                                }
                                else {
                                    setError(data.error)
                                    toast.error(data.message);
                                }
                            })();
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="col-md-6 mx-auto">
                                <Row>
                                    <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
                                        <Field
                                            type="password"
                                            placeholder="Password."
                                            name="password"
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                        <small className="text-danger">{error?.password?.[0] ? error?.password?.[0] : <ErrorMessage name="password" />}</small>
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingInput" label="Confrim Password" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
                                        <Field
                                            type="password"
                                            placeholder="Confrim Password."
                                            name="password_confirmation"
                                            className="form-control"
                                            autoComplete="off"
                                        />
                                        <small className="text-danger">{error?.password_confirmation?.[0] ? error?.password_confirmation?.[0] : <ErrorMessage name="password_confirmation" />}</small>
                                    </FloatingLabel>

                                    <Col md="12" className="sbt-btn p-2">
                                        <Button className="submitbtn" variant="primary" type="submit"> Submit </Button>
                                        <Link className="text-green ms-2" to="/forgot-password">Back to Forgot Password</Link>
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

export default ResetPassword