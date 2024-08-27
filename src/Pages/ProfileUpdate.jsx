import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import SubHeader from "../Components/SubHeader";
import useProfile from "../Hooks/useProfile";
import PictureInput from "../Components/PictureInput";
import ProfileMenus from "../Components/include/ProfileMenus";
import MetaTags from "../Components/MetaTags";

const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    'image/png'
];

const ProfileUpdate = () => {

    const { name, email, mobile } = useProfile();
    const [error, setError] = useState({})
    // const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2).max(100).required("Please enter your name."),
        email: Yup.string().min(2).max(50).email().required("Please enter your email."),
        mobile: Yup.string().typeError("Please enter mobile number.").max(50).required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
	
        // mobile: Yup.string().typeError("Please enter mobile number.").matches(phoneRegExp, "Phone number is not valid").required("Please enter mobile number."),
        image: Yup.mixed().nullable().test("fileSize", "File too large", (value) => {
            if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
            return true;
        })
            .test("fileFormat", "Unsupported Format.", (value) => {
                if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
                return true;
            }),
    });
    return (
        <>
            <MetaTags data={{ title: 'Profile Update' }} />
            <SubHeader heading="Profile Update" />
            <Container fluid className="pt-5">
                <Container className="login-form">
                    <Row className="pb-5">
                        <Col md={4} className="pe-4">
                            <ProfileMenus />
                        </Col>
                        <Col md={8} className="pe-4">
                            <div className="card">
                                <div className="card-body">
                                    <Formik
                                        initialValues={{ name, email, mobile, image: null }}
                                        validationSchema={SignupSchema}
                                        enableReinitialize
                                        onSubmit={(values) => {
                                            (async () => {
                                                var { data } = await AxiosHelper.postData("updateprofile", values, true);
                                                if (data.status === true) {
                                                    toast.success("Successfully Updated..!!");
                                                }
                                                else {
                                                    setError(data.error)
                                                    toast.error(data.message);
                                                }
                                            })();
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="col-md-12 px-3">
                                                <Row>
                                                    <div className="d-flex justify-content-center text-center pb-3">
                                                        <h3 className="head">Update Profile</h3>
                                                    </div>
                                                    <FloatingLabel controlId="floatingInput" label="Name *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
                                                        <Field
                                                            type="text"
                                                            placeholder="Phone No."
                                                            name="name"
                                                            className="form-control"
                                                        />
                                                        <small className="text-danger">{error?.name?.[0] ? error?.name?.[0] : <ErrorMessage name="name" />}</small>
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingInput" label="Email *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
                                                        <Field
                                                            type="text"
                                                            placeholder="Email"
                                                            name="email"
                                                            className="form-control"
                                                        />
                                                        <small className="text-danger">{error?.email?.[0] ? error?.email?.[0] : <ErrorMessage name="email" />}</small>
                                                    </FloatingLabel>


                                                    <FloatingLabel controlId="floatingInput" label="Mobile No. *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
                                                        <Field
                                                            type="text"
                                                            placeholder="Mobile No."
                                                            name="mobile"
                                                            className="form-control"
                                                        />

                                                        <small className="text-danger">{error?.mobile?.[0] ? error?.mobile?.[0] : <ErrorMessage name="mobile" />}</small>
                                                    </FloatingLabel>

                                                    <FloatingLabel controlId="floatingInput" label="Profile Image" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
                                                        <Field
                                                            type="file"
                                                            placeholder="Profile Image"
                                                            name="image"
                                                            component={PictureInput}
                                                        />

                                                        <small className="text-danger">{error?.image?.[0] ? error?.image?.[0] : <ErrorMessage name="image" />}</small>
                                                    </FloatingLabel>
                                                    <Col md="12" className="sbt-btn p-2">
                                                        <Button className="submitbtn" variant="primary" type="submit"> Update </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

export default ProfileUpdate
