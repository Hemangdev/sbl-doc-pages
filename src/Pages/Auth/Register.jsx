import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, FloatingLabel } from "react-bootstrap";
import AxiosHelper from "../../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import SubHeader from "../../Components/SubHeader";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from '../../Components/Captcha';
import { useEffect } from "react";
import { hideLoader, scrollToTop, showLoader } from "../../helper/LoaderHelper";
import CountryCodes from "../../constant/CountryCodes.json"
import MetaTags from "../../Components/MetaTags";
const public_path = process.env.REACT_APP_PUBLIC_URL
// const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

const Register = () => {
	const navigate = useNavigate();
	const [error, setError] = useState({})
	const [showPass, setShowPass] = useState(false)
	const SignupSchema = Yup.object().shape({
		name: Yup.string().min(2).max(100).required("Please enter your name."),
		email: Yup.string().min(2).max(50).email().required("Please enter your email."),
		// mobile: Yup.string()
		// 	.when('country_code', (country_code) => {
		// 		// return country_code === '+91' ? Yup.string().max(15).required("Please enter mobile number.").matches(phoneRegExp, "Phone number is not valid") : Yup.string().max(15).required("Please enter mobile number.").min(10);
		// 		return country_code ===  ;
		// 	}),

		mobile: Yup.string().typeError("Please enter mobile number.").max(50).required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
		password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please enter password."),
		password_confirmation: Yup.string().min(2).max(50).required("Please enter Confirm password.").oneOf([Yup.ref('password'), null], 'Passwords must match'),
		captcha: Yup.string().min(1, "Please resolve captcha first.").required("Please enter Captcha."),
		country_code: Yup.string().required(),
		otp: Yup.number().required("Please enter OTP."),
	});


	useEffect(() => {
		loadCaptchaEnginge(6, 'white', 'green');
	}, [])

	const sendOTP = async (values) => {
		let { data } = await AxiosHelper.postData("send_otp", values);
		if (data.status === true) {
			hideLoader()
			setError({})
			toast.success(data.message);
		}
		else {
			hideLoader()
			setError(data.error)
			toast.error(data.message);
		}
	}

	return (
		<>
			<MetaTags data={{ title: 'Register' }} />
			<SubHeader heading="Register" />
			<Container fluid className="pt-5 bgwhite">
				<Container className="login-form">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="head">Register Here </h3>
					</Row>
					<Row className="pt-5 pb-5">
						<Formik
							initialValues={{ name: "", email: "", country_code: "+91", mobile: "", password: "", password_confirmation: "", captcha: '', otp: "" }}
							validationSchema={SignupSchema}
							onSubmit={(values, { setErrors, resetForm }) => {
								(async () => {
									if (validateCaptcha(values.captcha)) {
										showLoader()
										let { data } = await AxiosHelper.postData("register", values);
										if (data.status === true) {
											setError({})
											toast.success(data.message);
											hideLoader()
											scrollToTop()
											return navigate(`${public_path}/login`);
										}
										else {
											hideLoader()
											setError(data.error)
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
								<Form className="col-md-6 mx-auto">
									<Row>
										<FloatingLabel controlId="floatingInput" label="Name *" className="mb-2 col-sm-12 fild" >
											<Field
												type="text"
												placeholder="Phone No."
												name="name"
												className="form-control"
												autoComplete="off"
											/>
											<small className="text-danger">{error?.name?.[0] ? error?.name?.[0] : <ErrorMessage name="name" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Email *" className="mb-2 col-sm-12 fild" >
											<Field
												type="text"
												placeholder="Email"
												name="email"
												className="form-control"
												autoComplete="off"
											/>
											<small className="text-danger">{error?.email?.[0] ? error?.email?.[0] : <ErrorMessage name="email" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Country Code" className="mb-3 col-sm-3 fild" >
											<Field as="select" name="country_code" className="form-control">
												{CountryCodes?.map((item, i) => (
													<option key={i} value={item?.dial_code}>{item?.dial_code}</option>
												))}
											</Field>
											<small className="text-danger">{error?.country_code?.[0] ? error?.country_code?.[0] : <ErrorMessage name="country_code" />}</small>
										</FloatingLabel>
										<FloatingLabel controlId="floatingInput" label="Mobile No. *" className="mb-3 col-sm-6 fild" >
											<Field
												type="text"
												placeholder="Mobile No."
												name="mobile"
												className="form-control"
												autoComplete="off"
											/>
											<small className="text-danger">{error?.mobile?.[0] ? error?.mobile?.[0] : <ErrorMessage name="mobile" />}</small>
										</FloatingLabel>

										<div className="mb-3 col-sm-3 d-flex justify-content-end ">
											<button onClick={() => sendOTP(values)} type="button" className="btn btn-success" style={{ maxHeight: 58 }}>Send OTP</button>
										</div>

										<FloatingLabel controlId="floatingInput" label="OTP *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
											<Field
												type="number"
												placeholder="OTP"
												name="otp"
												className="form-control"
												autoComplete="off"
											/>
											<small className="text-danger">{error?.otp?.[0] ? error?.otp?.[0] : <ErrorMessage name="otp" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Password *" className="mb-2 col-sm-12 fild">
											<Field
												type={showPass ? "text" : "password"}
												placeholder="Password."
												name="password"
												className="form-control"
												autoComplete="off"
											/>
											<i className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPass(!showPass)}></i>
											<small className="text-danger">{error?.password?.[0] ? error?.password?.[0] : <ErrorMessage name="password" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Confrim Password *" className="mb-2 col-sm-12 fild">
											<Field
												type={showPass ? "text" : "password"}
												placeholder="Confrim Password."
												name="password_confirmation"
												className="form-control"
												autoComplete="off"
											/>
											<i className={`fa ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPass(!showPass)}></i>
											<small className="text-danger">{error?.password_confirmation?.[0] ? error?.password_confirmation?.[0] : <ErrorMessage name="password_confirmation" />}</small>
										</FloatingLabel>

										<Col md="12" className="mb-2">
											<Row>
												<div className="col-sm-6 mb-2 fild">
													<LoadCanvasTemplate />
												</div>
												<div className="col-sm-6 mb-2 fild">
													<input type="text" value={values.captcha} onChange={e => {
														setFieldValue('captcha', e.target.value)
													}} className="form-control rounded-0" placeholder="Enter Captcha Value"></input>
													<small className="text-danger">
														<ErrorMessage name="captcha" />
													</small>
												</div>
												<div className="col-sm-4 text-center mb-2">
													<button className="btn submitbtn text-white" type="submit"> Submit </button>
												</div>
												<div className="col-sm-8 d-flex align-items-center">
													<Link className="text-green w-100 text-md-center" to={`${public_path}/login`}>Already have an account.</Link>
												</div>
											</Row>
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

export default Register;
