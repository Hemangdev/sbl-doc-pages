import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Row, Col, Button, FloatingLabel, Container } from "react-bootstrap";
import AxiosHelper from "../../helper/AxiosHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import SubHeader from "../../Components/SubHeader";
import ProfileMenus from "../../Components/include/ProfileMenus";
import MetaTags from "../../Components/MetaTags";

const ChangePassword = () => {

	const [error, setError] = useState({})
	const SignupSchema = Yup.object().shape({
		old_password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please enter old password."),
		password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Please enter new password."),
		password_confirmation: Yup.string().min(2).max(50).required().oneOf([Yup.ref('password'), null], 'Passwords must match')

	});
	return (
		<>
			<MetaTags data={{ title: 'Change Password' }} />
			<SubHeader heading="Change Password" />
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
										initialValues={{ old_password: "", password: "", password_confirmation: "" }}
										validationSchema={SignupSchema}
										enableReinitialize
										onSubmit={(values) => {
											(async () => {
												var { data } = await AxiosHelper.postData("updatepassword", values);
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
														<h3 className="head">Change Password</h3>
													</div>
													<FloatingLabel controlId="floatingInput" label="Old Password *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
														<Field
															type="password"
															placeholder="Old Password."
															name="old_password"
															className="form-control"
															autoComplete="off"
														/>
														<small className="text-danger">{error?.old_password?.[0] ? error?.old_password?.[0] : <ErrorMessage name="old_password" />}</small>
													</FloatingLabel>

													<FloatingLabel controlId="floatingInput" label="Password *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
														<Field
															type="password"
															placeholder="Password."
															name="password"
															className="form-control"
															autoComplete="off"
														/>
														<small className="text-danger">{error?.password?.[0] ? error?.password?.[0] : <ErrorMessage name="password" />}</small>
													</FloatingLabel>

													<FloatingLabel controlId="floatingInput" label="Confrim Password *" className="mb-3 col-md-12 col-sm-12 col-xs-12 fild">
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
			</Container >
		</>
	)
}

export default ChangePassword