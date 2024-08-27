import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import {
	Container,
	Row,
	Col,
	Button,
	FloatingLabel
} from "react-bootstrap";
import SubHeader from "../Components/SubHeader";
import PictureInput from "../Components/PictureInput";
import useSetting from "../Hooks/useSetting";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "../Components/Captcha";
import { hideLoader, showLoader } from "../helper/LoaderHelper";
import MetaTags from "../Components/MetaTags";


const FILE_SIZE = 2000000;
const SUPPORTED_FORMATS_IMAGE = [
	'application/pdf'
];

const CareerForm = () => {

	const [error, setError] = useState({})
	const { department } = useSetting()
	const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

	const SignupSchema = Yup.object().shape({
		name: Yup.string().min(2).max(100).required("Please enter your name."),
		email: Yup.string().min(2).max(50).email().required("Please enter your email."),
		mobile: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Please enter mobile number."),
		department: Yup.number().required("Please select department."),
		message: Yup.string().min(2).max(500).required("Please enter your message."),
		resume: Yup.mixed().nullable().test("fileSize", "File size too large, Maximum allow - 200kb", (value) => {
			if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
			return true;
		})
			.test("fileFormat", "Please upload pdf only.", (value) => {
				if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
				return true;
			}).required(),
		cover_letter: Yup.mixed().nullable().test("fileSize", "File size too large, Maximum allow - 200kb", (value) => {
			if (value && (typeof value) !== 'string') return value.size <= FILE_SIZE;
			return true;
		})
			.test("fileFormat", "Please upload pdf only.", (value) => {
				if (value && (typeof value) !== 'string') return SUPPORTED_FORMATS_IMAGE.includes(value.type);
				return true;
			}).required(),
		captcha: Yup.string().min(1, "Please resolve captcha first.").required()
	});

	useEffect(() => {
		loadCaptchaEnginge(6, 'white', 'green');
	}, [])

	return (
		<>
			<MetaTags data={{ title: 'Career Form' }} />
			<SubHeader heading="Career Form" />
			<Container fluid className="pt-5 bgwhite">
				<Container className="contact-form">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="head">Work With US</h3>
						<p className="subhead">
							Please complete the form below to apply for a position with us.
						</p>
					</Row>
					<Row className="pt-5 pb-5">
						<Formik
							initialValues={{ name: "", email: "", mobile: "", department: "", message: "", resume: null, cover_letter: null, captcha: "" }}
							validationSchema={SignupSchema}
							enableReinitialize
							onSubmit={(values, { resetForm, setErrors }) => {
								(async () => {
									if (validateCaptcha(values.captcha)) {
										showLoader()
										var { data } = await AxiosHelper.postData("career", values, true);
										if (data.status === true) {
											resetForm();
											hideLoader()
											toast.success(data.message);
										}
										else {
											hideLoader()
											setError(data?.data)
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

										<FloatingLabel controlId="floatingInput" label="Select Department" className="mb-3 mb-3 col-md-6 col-sm-12 col-xs-12 fild" >
											<Field as="select" name="department" className="form-control">
												<option value="">Select Department</option>
												{
													Object.keys(department)?.map((key, index) => <option value={key} key={key}>{department?.[key]}</option>)
												}

											</Field>
											<small className="text-danger">{error?.department ? error?.department : <ErrorMessage name="department" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Upload Resume" className="mb-3 col-md-6 col-sm-6 col-xs-6 fild" >
											<Field
												type="file"
												placeholder="Upload Resume"
												name="resume"
												component={PictureInput}
											/>

											<small className="text-danger">{error?.resume ? error?.resume : <ErrorMessage name="resume" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Upload Cover Letter" className="mb-3 col-md-6 col-sm-6 col-xs-6 fild" >
											<Field
												type="file"
												placeholder="Upload Cover Letter"
												name="cover_letter"
												component={PictureInput}
											/>

											<small className="text-danger">{error?.cover_letter ? error?.cover_letter : <ErrorMessage name="cover_letter" />}</small>
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

										<Col md="8">
											<div className="row">
												<div className="col-6">
													<LoadCanvasTemplate />
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
										<Col md="4" className="d-flex justify-content-center">
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

export default CareerForm;
