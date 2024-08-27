import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from '../Components/Captcha';
import {
	Container,
	Row,
	Col,
	Button,
	FloatingLabel
} from "react-bootstrap";
import { hideLoader, showLoader } from "../helper/LoaderHelper";

const ContactForm = () => {

	const [error, setError] = useState({})
	const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

	const SignupSchema = Yup.object().shape({
		name: Yup.string().min(2).max(100).required("Please enter your name."),
		email: Yup.string().min(2).max(50).email().required("Please enter your email."),
		mobile: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Please enter mobile number."),
		subject: Yup.string().min(2).max(100).required("Please enter message subject."),
		message: Yup.string().min(2).max(500).required("Please enter your message."),
		captcha: Yup.string().min(1, "Please resolve captcha first.").required()
	});

	useEffect(() => {
		loadCaptchaEnginge(6, 'white', 'green');
	}, [])

	return (
		<>
			<Container fluid className="pt-5 bgwhite">
				<Container className="contact-form">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="head">GET IN TOUCH </h3>
						<p className="subhead">
							Please feel free to contact us if you have further any question
							and concerns
						</p>
					</Row>
					<Row className="pt-5 pb-5">
						<Formik
							initialValues={{ name: "", email: "", mobile: "", subject: "", message: "", captcha: "" }}
							validationSchema={SignupSchema}
							enableReinitialize
							onSubmit={(values, { setErrors, resetForm }) => {
								(async () => {
									if (validateCaptcha(values.captcha)) {
										showLoader()
										var { data } = await AxiosHelper.postData("inquiry", values, true);
										if (data.status === true) {
											resetForm();
											hideLoader()
											setError({})
											toast.success("Message Send Successfully..!!");
										}
										else {
											hideLoader()
											setError(data.data)
											toast.error(data.message);
										}
									}
									else {
										setErrors({ captcha: "Invalid Captcha.." })
									}
								})();
							}}
						>
							{({ errors, touched, values, setFieldValue }) => (
								<Form className="col-md-12">
									<Row>
										<FloatingLabel controlId="floatingInput" label="Name" className="mb-3 mb-3 col-md-6 col-sm-12 col-xs-12 fild" >
											<Field
												type="text"
												placeholder="Phone No."
												name="name"
												className="form-control"
											/>
											<small className="text-danger">{error?.name ? error?.name : <ErrorMessage name="name" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Email" className="mb-3 mb-3 col-md-6 col-sm-12 col-xs-12 fild" >
											<Field
												type="text"
												placeholder="Email"
												name="email"
												className="form-control"
											/>
											<small className="text-danger">{error?.email ? error?.email : <ErrorMessage name="email" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Mobile No." className="mb-3 mb-3 col-md-6 col-sm-12 col-xs-12 fild" >
											<Field
												type="text"
												placeholder="Mobile No."
												name="mobile"
												className="form-control"
											/>
											<small className="text-danger">{error?.mobile ? error?.mobile : <ErrorMessage name="mobile" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Message Subject" className="mb-3 mb-3 col-md-6 col-sm-12 col-xs-12 fild" >
											<Field
												type="text"
												placeholder="Message Subject"
												name="subject"
												className="form-control"
											/>
											<small className="text-danger">{error?.subject ? error?.subject : <ErrorMessage name="subject" />}</small>
										</FloatingLabel>

										<FloatingLabel
											className="mb-3 col-md-12 col-sm-12 col-xs-12 fild"
											controlId="floatingTextarea2"
											label="Message"
										>
											<Field
												as="textarea"
												placeholder="Leave a Message here"
												style={{ height: "100px" }}
												name="message"
												className="form-control"
											/>
											<small className="text-danger">{error?.message ? error?.message : <ErrorMessage name="message" />}</small>
										</FloatingLabel>

										<Col md="6">
											<div className="row">
												<div className="col-6">
													<LoadCanvasTemplate reloadColor="red" />
												</div>
												<div className="col-6 fild">
													<input type="text" value={values.captcha} onChange={e => {
														setFieldValue('captcha', e.target.value)
													}} className="form-control rounded-0" placeholder="Enter Captcha Value"></input>
													<small className="text-danger">
														<ErrorMessage name="captcha" />
													</small>
												</div>
											</div>
										</Col>
										<Col md="6" className="d-flex justify-content-center" >
											<Button className="submitbtn  mx-2" variant="primary" type="submit"> Update </Button>
										</Col>
									</Row>
								</Form>
							)}
						</Formik>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default ContactForm;
