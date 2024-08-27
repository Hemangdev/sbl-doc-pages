import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import useProfile from "../Hooks/useProfile";
import GoogleAuth from "./include/Auth/GoogleAuth";
import Facebook from "./include/Auth/Facebook";
const public_path = process.env.REACT_APP_PUBLIC_URL

const SignupSchema = Yup.object().shape({
	mobile: Yup.string().typeError("Please enter mobile number.").max(50).required("Please enter mobile number.").matches(/^[0-9]+$/, "Must be only digits"),
	password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please enter password."),
});

const LoginFrom = () => {
	const navigate = useNavigate();
	const { setData } = useProfile()
	const [error, setError] = useState({})
	return (
		<>
			<Container fluid className="pt-5 bgwhite">
				<Container className="login-form">
					<Row className="d-flex justify-content-center text-center">
						<h3 className="head">Login </h3>
					</Row>
					<Row className="pt-5">
						<Formik
							initialValues={{ mobile: "", password: "" }}
							validationSchema={SignupSchema}
							onSubmit={(values) => {
								(async () => {
									var { data } = await AxiosHelper.postData("login", values);
									if (data.status === true) {
										localStorage.setItem('token', data.data.access_token)
										toast.success("Successfully Login..!!");
										setData(data.data.user)
										return navigate(`${public_path}/home`);
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
										<FloatingLabel controlId="floatingInput" label="Mobile No. *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild" >
											<Field
												type="text"
												placeholder="Mobile No. *"
												name="mobile"
												className="form-control"
												autoComplete="off"
											/>

											<small className="text-danger">{error?.mobile?.[0] ? error?.mobile?.[0] : <ErrorMessage name="mobile" />}</small>
										</FloatingLabel>

										<FloatingLabel controlId="floatingInput" label="Password *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
											<Field
												type="password"
												placeholder="password. *"
												name="password"
												className="form-control"
												autoComplete="off"
											/>
											<small className="text-danger">{error?.password?.[0] ? error?.password?.[0] : <ErrorMessage name="password" />}</small>
										</FloatingLabel>

										<Col md="12" className="sbt-btn p-2">
											<Button className="submitbtn" variant="primary" type="submit"> Log in </Button>
											<Link className="text-green ms-2" to={`${public_path}/register`}>Don't have an account yet?</Link>
											<Link className="text-green ms-2" to={`${public_path}/forgot-password`}>Forgot Password</Link>
										</Col>
									</Row>
								</Form>
							)}
						</Formik>
					</Row>
					<Row className="justify-content-md-center pb-5">
						<Col md={3} className="mt-2">
							<GoogleAuth />
						</Col>
						<Col md={3} className="mt-2">
							<Facebook />
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default LoginFrom;
