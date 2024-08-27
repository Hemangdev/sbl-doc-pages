import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Col, Row } from 'react-bootstrap'
import InstaFollow from '../Components/InstaFollow'
import Service from '../Components/Service'
import SubHeader from '../Components/SubHeader'
import useSetting from '../Hooks/useSetting'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from '../Components/Captcha';
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { hideLoader, showLoader } from "../helper/LoaderHelper";
import AxiosHelper from "../helper/AxiosHelper";
import { toast } from "react-toastify";
import { loadScript } from "../helper/RazorpayHelper";
import MetaTags from "../Components/MetaTags";

var values = {
    name: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    city: '',
    phone: '',
    email: '',
    occupation: '',
    general_nature: '',
    about_present_disease: '',
    already_seen_doctor: '',
    investigations: '',
    anything_problem_relevant: '',
    past_history: '',
    prefer_weather: '',
    appetite: '',
    thirst: '',
    specific_taste: '',
    urine: '',
    stool: '',
    perspiration: '',
    sleep_pattern: '',
    speed: '',
    sensitivity: '',
    gynae_obs_history: '',
    menstrual_history: '',
    age_of_menarche: '',
    history_of_abortions: '',
    father_mother_siblings: '',
    share_with_doctor: '',
    cigarettes: '',
    alcohol: '',
    exercise_sessions: '',
    captcha: ""
}

const PaidConsultation = () => {
    const { consultation_message, consultation_fee_inr, consultation_days } = useSetting()
    const [error, setError] = useState({})

    useEffect(() => {
        loadCaptchaEnginge(6, 'white', 'green');
    }, [])

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2).max(100).required("Please enter your name."),
        gender: Yup.number().min(1, "Please select your gender.").max(3, "Please select your gender.").required("Please select your gender."),
        age: Yup.number().min(2).max(100).required("Please enter your age."),
        height: Yup.number().min(2).max(300).nullable(),
        weight: Yup.number().min(2).max(200).nullable(),
        city: Yup.string().min(2).max(100).required(),
        phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10).max(12).required("Please enter mobile number."),
        email: Yup.string().min(2).email().max(100).required("Please enter your email."),
        occupation: Yup.string().min(2).max(100).nullable(),
        general_nature: Yup.string().min(2).max(500).nullable(),
        about_present_disease: Yup.string().min(2).max(500).nullable(),
        already_seen_doctor: Yup.string().min(2).max(500).nullable(),
        investigations: Yup.string().min(2).max(500).nullable(),
        anything_problem_relevant: Yup.string().min(2).max(500).nullable(),
        past_history: Yup.string().min(2).max(500).nullable(),
        prefer_weather: Yup.string().min(2).max(100).nullable(),
        appetite: Yup.string().min(2).max(100).nullable(),
        thirst: Yup.string().min(2).max(100).nullable(),
        specific_taste: Yup.string().min(2).max(100).nullable(),
        urine: Yup.string().min(2).max(100).nullable(),
        stool: Yup.string().min(2).max(100).nullable(),
        perspiration: Yup.string().min(2).max(100).nullable(),
        sleep_pattern: Yup.string().min(2).max(100).nullable(),
        speed: Yup.string().min(2).max(100).nullable(),
        sensitivity: Yup.string().min(2).max(500).nullable(),
        gynae_obs_history: Yup.string().min(2).max(100).nullable(),
        menstrual_history: Yup.string().min(2).max(100).nullable(),
        age_of_menarche: Yup.string().min(2).max(100).nullable(),
        history_of_abortions: Yup.string().min(2).max(100).nullable(),
        father_mother_siblings: Yup.string().min(2).max(500).nullable(),
        share_with_doctor: Yup.string().min(2).max(500).nullable(),
        cigarettes: Yup.string().min(2).max(100).nullable(),
        alcohol: Yup.string().min(2).max(100).nullable(),
        exercise_sessions: Yup.string().min(2).max(100).nullable(),
        captcha: Yup.string().min(1, "Please resolve captcha first.").required()
    });

    return (
        <>
            <MetaTags data={{ title: 'Online Consultation' }} />
            <SubHeader heading="Paid Consultation Form" />
            <div className="bgwhite py-5 w-100">
                <div className="container consultation_form">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="form_details">
                                <h1 className="page-title">Online <span>Consultation</span></h1>
                                <div dangerouslySetInnerHTML={{ __html: consultation_message }}></div>
                                <br />
                                <font className="consult_text">Consultation charges are Rs {consultation_fee_inr} which is valid for {consultation_days} days unlimited consultations per patient.</font> <br />
                                (We also have lady doctor in our medical panel).<br />
                                <div className="clear" />
                            </div>
                        </div>
                        <div className="col-md-8 mt-4 row border border-2 p-4">
                            <Formik
                                initialValues={values}
                                validationSchema={SignupSchema}
                                enableReinitialize
                                onSubmit={(values, { resetForm }) => {
                                    if (validateCaptcha(values.captcha)) {
                                        (async () => {
                                            showLoader()

                                            // Load Razorpay Script
                                            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                                            if (!res) {
                                                toast.error("Razorpay SDK failed to load. Are you online?");
                                                return false;
                                            }

                                            // Create Entry in  Database with status Unpaid
                                            values.amount = consultation_fee_inr;
                                            var { data } = await AxiosHelper.postData("create_consultation", values);
                                            if (!data) {
                                                toast.error("Server error. Are you online?");
                                                return false;
                                            }

                                            if (data.status === true) {
                                                // Getting the order details back

                                                const { payment_key, amount, currency, application_name, description, logo, order_id, sbl_consultation_id } = data.data;

                                                const options = {
                                                    key: payment_key, // Enter the Key ID generated from the Dashboard
                                                    amount: amount.toString(),
                                                    currency: currency,
                                                    name: application_name,
                                                    description: description,
                                                    image: logo,
                                                    order_id,
                                                    handler: async (response) => {
                                                        const dataResponce = {
                                                            orderCreationId: order_id,
                                                            sbl_consultation_id,
                                                            razorpayPaymentId: response.razorpay_payment_id,
                                                            razorpayOrderId: response.razorpay_order_id,
                                                            razorpaySignature: response.razorpay_signature,
                                                        };

                                                        showLoader()
                                                        const { data } = await AxiosHelper.postData("/update_consultation_payment", dataResponce);
                                                        if (data.status === true) {
                                                            setError({})
                                                            hideLoader()
                                                            resetForm();
                                                            toast.success(data.message)
                                                        }
                                                        else {
                                                            toast.error(data.message)
                                                            return false;
                                                        }
                                                    },
                                                    prefill: {
                                                        name: values?.name,
                                                        email: values?.email,
                                                        contact: values?.phone,
                                                    },
                                                    notes: {
                                                        address: values?.city,
                                                    },
                                                    theme: {
                                                        color: "#61dafb",
                                                    },
                                                    modal: {
                                                        ondismiss: function () {
                                                            hideLoader()
                                                            toast.error("Payment Cancelled.");
                                                        }
                                                    }
                                                };

                                                const paymentObject = new window.Razorpay(options);
                                                paymentObject.on('payment.failed', function (response) {
                                                    hideLoader()
                                                    toast.error(response.error.description);
                                                });

                                                paymentObject.open();
                                            }
                                            else {
                                                hideLoader()
                                                setError(data.data)
                                                toast.error(data.message);
                                                return false;
                                            }
                                        })()
                                    }
                                    else {
                                        setError({ captcha: "Invalid Captcha.." })
                                    }
                                }}
                            >
                                {({ errors, touched, setFieldValue }) => (
                                    <Form>
                                        <Row>
                                            <Col md={12} className="my-2 border-bottom border-2 border-green">
                                                <h3 className="text-center text-green">Paid Consultation Form</h3>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-6 col-form-label">Name/identifier : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="name" className="form-control" id="name" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.name ? error?.name : <ErrorMessage name="name" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-6 col-form-label">Gender  : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6 d-flex align-items-center">
                                                        <div className="form-check form-check-inline">
                                                            <Field className="form-check-input" type="radio" name="gender" id="male" value="1" />
                                                            <label className="form-check-label" htmlFor="male">Male</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Field className="form-check-input" type="radio" name="gender" id="female" value="2" />
                                                            <label className="form-check-label" htmlFor="female">Female</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <Field className="form-check-input" type="radio" name="gender" id="other" value="3" />
                                                            <label className="form-check-label" htmlFor="other">Other</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.gender ? error?.gender : <ErrorMessage name="gender" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="age" className="col-sm-6 col-form-label">Age : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6">
                                                        <Field type="number" name="age" className="form-control" id="age" placeholder="Age" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.age ? error?.age : <ErrorMessage name="age" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="height" className="col-sm-6 col-form-label">Height (Cm) :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="number" name="height" className="form-control" id="height" placeholder="Height (Cm)" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.height ? error?.height : <ErrorMessage name="height" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="weight" className="col-sm-6 col-form-label">Weight (Kg) :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="number" name="weight" className="form-control" id="weight" placeholder="Weight (Kg)" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.weight ? error?.weight : <ErrorMessage name="weight" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="city" className="col-sm-6 col-form-label">City : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="city" className="form-control" id="city" placeholder="City" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.city ? error?.city : <ErrorMessage name="city" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="phone" className="col-sm-6 col-form-label">Mobile : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="phone" className="form-control" id="phone" placeholder="Mobile" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.phone ? error?.phone : <ErrorMessage name="phone" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="email" className="col-sm-6 col-form-label">Email : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="email" className="form-control" id="email" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.email ? error?.email : <ErrorMessage name="email" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="occupation" className="col-sm-6 col-form-label">
                                                        Occupation :
                                                        <div className="small text-info">(This is often relevant to your health as are unusual hobbies)</div>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="occupation" className="form-control" id="occupation" placeholder="Occupation" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.occupation ? error?.occupation : <ErrorMessage name="occupation" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="general_nature" className="col-sm-6 col-form-label">
                                                        Your general nature :
                                                        <div className="small text-info">(Anger, extrovert or introvert, emotional, decision making quality, childhood nature, how you take criticism etc.)</div>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="general_nature" className="form-control" id="general_nature" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.general_nature ? error?.general_nature : <ErrorMessage name="general_nature" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="about_present_disease" className="col-sm-6 col-form-label">
                                                        Details about your present Disease/ailments in order of appearance with duration
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="about_present_disease" className="form-control" id="about_present_disease" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.about_present_disease ? error?.about_present_disease : <ErrorMessage name="about_present_disease" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="already_seen_doctor" className="col-sm-6 col-form-label">
                                                        If you have already seen a doctor, what diagnosis did they give you?
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="already_seen_doctor" className="form-control" id="already_seen_doctor" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.already_seen_doctor ? error?.already_seen_doctor : <ErrorMessage name="already_seen_doctor" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="investigations" className="col-sm-6 col-form-label">
                                                        What investigations, tests have you undergone? Please mention the reports and brief treatment history.
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" rows="3" type="text" name="investigations" className="form-control" id="investigations" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.investigations ? error?.investigations : <ErrorMessage name="investigations" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="anything_problem_relevant" className="col-sm-6 col-form-label">
                                                        Is there anything else that might be helpful or relevant to your problem? including allergies, illnesses that run in the family and a little bit about your lifestyle.
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" rows="3" type="text" name="anything_problem_relevant" className="form-control" id="anything_problem_relevant" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.anything_problem_relevant ? error?.anything_problem_relevant : <ErrorMessage name="anything_problem_relevant" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="past_history" className="col-sm-6 col-form-label">
                                                        Past History :
                                                        <div className="small text-info"> (Diseases or symptoms you have suffered in past, with treatment history)</div>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="past_history" className="form-control" id="past_history" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.past_history ? error?.past_history : <ErrorMessage name="past_history" />}</small>
                                            </Col>


                                            <Col md={12} className="mt-2">
                                                <h4 className="toprow">Physical Generals</h4>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="prefer_weather" className="col-sm-6 col-form-label">Which weather you prefer most :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="prefer_weather" className="form-control" id="prefer_weather" placeholder="Which weather you prefer most" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.prefer_weather ? error?.prefer_weather : <ErrorMessage name="prefer_weather" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="appetite" className="col-sm-6 col-form-label">Appetite :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="appetite" className="form-control" id="appetite" placeholder="Appetite" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.appetite ? error?.appetite : <ErrorMessage name="appetite" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="thirst" className="col-sm-6 col-form-label">Thirst :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="thirst" className="form-control" id="thirst" placeholder="Thirst" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.thirst ? error?.thirst : <ErrorMessage name="thirst" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="specific_taste" className="col-sm-6 col-form-label">Liking for specific taste/food :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="specific_taste" className="form-control" id="specific_taste" placeholder="Liking for specific taste/food" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.specific_taste ? error?.specific_taste : <ErrorMessage name="specific_taste" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="urine" className="col-sm-6 col-form-label">Urine :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="urine" className="form-control" id="urine" placeholder="Urine" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.urine ? error?.urine : <ErrorMessage name="urine" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="stool" className="col-sm-6 col-form-label">Stool :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="stool" className="form-control" id="stool" placeholder="Stool" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.stool ? error?.stool : <ErrorMessage name="stool" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="perspiration" className="col-sm-6 col-form-label">Perspiration :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="perspiration" className="form-control" id="perspiration" placeholder="Perspiration" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.perspiration ? error?.perspiration : <ErrorMessage name="perspiration" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="sleep_pattern" className="col-sm-6 col-form-label">Sleep pattern, position during sleep :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="sleep_pattern" className="form-control" id="sleep_pattern" placeholder="Sleep pattern, position during sleep" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.sleep_pattern ? error?.sleep_pattern : <ErrorMessage name="sleep_pattern" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="speed" className="col-sm-6 col-form-label">Speed (walking, eating, working) :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="speed" className="form-control" id="speed" placeholder="Speed" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.speed ? error?.speed : <ErrorMessage name="speed" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="sensitivity" className="col-sm-6 col-form-label">
                                                        Sensitivity :
                                                        <div className="small text-info"> (To noise/ light/ sunlight/ high neck, ties/ narrow places/ closed rooms/ traveling in vehicles/ by air/ perfumes/ dust/ others)</div>
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" rows="3" type="text" name="sensitivity" className="form-control" id="sensitivity" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.sensitivity ? error?.sensitivity : <ErrorMessage name="sensitivity" />}</small>
                                            </Col>


                                            <Col md={12} className="mt-2">
                                                <h4 className="toprow">Females</h4>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="gynae_obs_history" className="col-sm-6 col-form-label">Gynae and Obs history :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="gynae_obs_history" className="form-control" id="gynae_obs_history" placeholder="Gynae and Obs history" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.gynae_obs_history ? error?.gynae_obs_history : <ErrorMessage name="gynae_obs_history" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="menstrual_history" className="col-sm-6 col-form-label">Menstrual history :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="menstrual_history" className="form-control" id="menstrual_history" placeholder="Menstrual history" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.menstrual_history ? error?.menstrual_history : <ErrorMessage name="menstrual_history" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="age_of_menarche" className="col-sm-6 col-form-label">Age of menarche/ menopause :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="age_of_menarche" className="form-control" id="age_of_menarche" placeholder="Age of menarche/ menopause" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.age_of_menarche ? error?.age_of_menarche : <ErrorMessage name="age_of_menarche" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="history_of_abortions" className="col-sm-6 col-form-label">History of abortions or miscarriage :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="history_of_abortions" className="form-control" id="history_of_abortions" placeholder="History of abortions or miscarriage" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.history_of_abortions ? error?.history_of_abortions : <ErrorMessage name="history_of_abortions" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <h4 className="toprow">Family history</h4>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="father_mother_siblings" className="col-sm-6 col-form-label">
                                                        Name the diseases which your father/ mother/ siblings might have suffered
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="father_mother_siblings" className="form-control" id="father_mother_siblings" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.father_mother_siblings ? error?.father_mother_siblings : <ErrorMessage name="father_mother_siblings" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="share_with_doctor" className="col-sm-6 col-form-label">
                                                        Anything else you would like to share with the doctor?
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <Field as="textarea" type="text" name="share_with_doctor" className="form-control" id="share_with_doctor" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.share_with_doctor ? error?.share_with_doctor : <ErrorMessage name="share_with_doctor" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="cigarettes" className="col-sm-6 col-form-label">Cigarettes/week :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="cigarettes" className="form-control" id="cigarettes" placeholder="Cigarettes/week" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.cigarettes ? error?.cigarettes : <ErrorMessage name="cigarettes" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="alcohol" className="col-sm-6 col-form-label">Alcohol units/week :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="alcohol" className="form-control" id="alcohol" placeholder="Alcohol units/week" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.alcohol ? error?.alcohol : <ErrorMessage name="alcohol" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="exercise_sessions" className="col-sm-6 col-form-label">Exercise sessions/week :</label>
                                                    <div className="col-sm-6">
                                                        <Field type="text" name="exercise_sessions" className="form-control" id="exercise_sessions" placeholder="Exercise sessions/week" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.exercise_sessions ? error?.exercise_sessions : <ErrorMessage name="exercise_sessions" />}</small>
                                            </Col>

                                            <Col md={12} className="mt-2">
                                                <div className="form-group row">
                                                    <label htmlFor="captcha" className="col-sm-6 col-form-label">Security Code <span className="small text-info">(Case Sensitive) </span> : <span className="text-danger">*</span></label>
                                                    <div className="col-sm-3">
                                                        <Field type="text" name="captcha" className="form-control" id="captcha" placeholder="" />
                                                    </div>
                                                    <div className="col-sm-3 px-0">
                                                        <LoadCanvasTemplate reloadColor="red" />
                                                    </div>
                                                </div>
                                                <small className="text-danger col-sm-6 offset-sm-6 d-block px-3">{error?.captcha ? error?.captcha : <ErrorMessage name="captcha" />}</small>
                                            </Col>
                                            <Col md={12} className="mt-3">
                                                <p className="mb-1 fs-7 text-primary"> (Please check this is correct.) We respond within 2 working days.</p>
                                                <h6 className="text">Click on the <b className="text-primary">Submit and Pay</b> button below to send us your form and proceed to Payment Gateway.</h6>
                                            </Col>

                                            <Col md="12" className="text-center mt-2">
                                                <Button className="btn btn-lg btn-primary" variant="primary" type="submit"> Submit and Pay </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>

            </div>
            <InstaFollow />
            <Service feeds={[]} />
        </>
    )
}

export default PaidConsultation