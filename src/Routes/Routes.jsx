import { lazy, Suspense } from "react";
import { Routes as DOMRoutes, Route, Outlet } from "react-router-dom";
import Loader from "../Components/include/Loader";
import Layout from "../HOC/Layout";
import Error404 from "../Pages/Error404";
import DoctorCorner from '../Pages/DoctorsCorner/DoctorsCorner'
import DoctorDetails from '../Pages/DoctorDetails/DoctorDetails'
import CaseStudy from '../Pages/DoctorCaseStudies/CaseStudy'
import Diseases from "../Pages/Diseases/Diseases";
import DoctorQuiz from "../Pages/DoctorQuiz/DoctorQuiz";
import HomeoUpdates from "../Pages/HomeoUpdates/HomeoUpdates";
import Oraganon from "../Pages/OraganonOfMedicine/Oraganon";
import HomeopathicMateria from "../Pages/HomeopathicMateria/HomeopathicMateria";
import DoctorsCorner from "../Pages/DoctorsCorner/DoctorsCorner";


// Auth Routes
const Login = lazy(() => import("../Pages/Auth/LogIn"));
const Register = lazy(() => import("../Pages/Auth/Register"));
const Logout = lazy(() => import("../Pages/Auth/Logout"));
const ForgotPassword = lazy(() => import("../Pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/Auth/ResetPassword"));
const MembershipSavings = lazy(() => import("../Pages/Membership/Savings"));
const Membership = lazy(() => import("../Pages/Membership"));

// Profile Routes
const Profile = lazy(() => import("../Pages/Profile"));
const Home = lazy(() => import("../Pages/Home"));
const About = lazy(() => import("../Pages/About"));
const Product = lazy(() => import("../Pages/Product"));
const AilmentVsRemedy = lazy(() => import("../Pages/AilmentVsRemedy"));
const AboutHomoeopathic = lazy(() => import("../Pages/AboutHomoeopathic"));
const CommonProvider = lazy(() => import("../Context/CommonProvider"));
const CheckLogin = lazy(() => import("../HOC/CheckLogin"));
const MetaTags = lazy(() => import("../Components/MetaTags"));
const Disclaimer = lazy(() => import("../Pages/CMS/Disclaimer"));
const PrivacyPolicy = lazy(() => import("../Pages/CMS/PrivacyPolicy"));
const ReturnsExchanges = lazy(() => import("../Pages/CMS/ReturnsExchanges"));
const DeliveryInformation = lazy(() => import("../Pages/CMS/DeliveryInformation"));
const CareerForm = lazy(() => import("../Pages/CareerForm"));
const TermsConditions = lazy(() => import("../Pages/CMS/TermsConditions"));
const AuthPagesCheck = lazy(() => import("../HOC/AuthPagesCheck"));
const ContactUs = lazy(() => import("../Pages/CMS/ContactUs"));
const FAQ = lazy(() => import("../Pages/CMS/FAQ"));
const ChairmanMessage = lazy(() => import("../Pages/CMS/ChairmanMessage"));
const NewsList = lazy(() => import("../Pages/NewsList"));
const BlogList = lazy(() => import("../Pages/CMS/BlogList"));
const BlogDetails = lazy(() => import("../Pages/CMS/BlogDetails"));
const Testimonial = lazy(() => import("../Pages/CMS/Testimonial"));
const NewsDetails = lazy(() => import("../Pages/NewsDetails"));
const Catalogue = lazy(() => import("../Pages/Catalogue"));
const ChangePassword = lazy(() => import("../Pages/Auth/ChangePassword"));
const ProfileUpdate = lazy(() => import("../Pages/ProfileUpdate"));
const MyAddress = lazy(() => import("../Pages/MyAddress"));
const ProductByCategory = lazy(() => import("../Pages/ProductByCategory"));
const ProductSearch = lazy(() => import("../Pages/ProductSearch"));
const ProductDetails = lazy(() => import("../Pages/ProductDetails"));
const CartItems = lazy(() => import("../Pages/CartItems"));
const CheckOut = lazy(() => import("../Pages/CheckOut"));
const MyOrderList = lazy(() => import("../Pages/MyOrderList"));
const MyOrderReturn = lazy(() => import("../Pages/MyOrderReturn"));
const PaidConsultation = lazy(() => import("../Pages/PaidConsultation"));
const QualityCertification = lazy(() => import("../Pages/QualityCertification"));
const DealerLocator = lazy(() => import("../Pages/DealerLocator"));
const CertificatePage = lazy(() => import("../Pages/CertificatePage"));
const CarePlan = lazy(() => import("../Pages/CarePlan"));
const public_path = process.env.REACT_APP_PUBLIC_URL

const Routes = () => {
  return (
    <CommonProvider>
      <MetaTags />
      <Suspense fallback={<Loader />}>
        <DOMRoutes>
          <Route path={public_path} element={<Layout current={<Outlet />} />}>
            <Route path="" element={<Home />} />
            <Route path="index.html" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:slug" element={<ProductByCategory />} />
            <Route path="product-search" element={<ProductSearch />} />
            <Route path="product-details/:slug" element={<ProductDetails />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="returns-exchanges" element={<ReturnsExchanges />} />
            <Route path="paid-consultation" element={<PaidConsultation />} />
            <Route path="delivery-information" element={<DeliveryInformation />} />
            <Route path="terms-conditions" element={<TermsConditions />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="career" element={<CareerForm />} />
            <Route path="faq-help" element={<FAQ />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/:slug" element={<NewsDetails />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/:slug" element={<BlogDetails />} />
            <Route path="testimonial" element={<Testimonial />} />
            <Route path="chairman-s-message" element={<ChairmanMessage />} />
            <Route path="download" element={<Catalogue />} />
            <Route path="cart" element={<CartItems />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="quality-certification" element={<QualityCertification />} />
            <Route path="about-homoeopathic" element={<AboutHomoeopathic />} />
            <Route path="care-plan" element={<CarePlan />} />
            <Route path="ailment-vs-remedy" element={<AilmentVsRemedy />} />
            <Route path="dealer-locator" element={<DealerLocator />} />
            <Route path="certificate-download" element={<CertificatePage />} />
            <Route path="membership" element={<Membership />} />
            <Route path="membership/savings" element={<MembershipSavings />} />
            <Route path="/doctor-corner" element={<DoctorCorner/>}/>
            <Route path="/doctor-details" element={<DoctorDetails/>}/>
            <Route path="/case-studies" element={<CaseStudy/>} />
            <Route path="/disease-details" element={<Diseases/>} />
            <Route path="/doctor-quiz" element={<DoctorQuiz/>}/>
            <Route path="/homeo-updates" element={<HomeoUpdates/>}/>
            <Route path="/organon-medicines" element={<Oraganon/>}/>
            <Route path="/homeopathic-materia" element={<HomeopathicMateria/>}/>
            <Route path='doctor-corner' element={<DoctorsCorner/>}/>
            
            <Route path={public_path} element={<AuthPagesCheck current={<Outlet />} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            <Route path={public_path} element={<CheckLogin current={<Outlet />} />}>
              <Route path="profile" element={<Profile />} />
              <Route path="update-profile" element={<ProfileUpdate />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="my-addresses" element={<MyAddress />} />
              <Route path="my-orders" element={<MyOrderList />} />
              <Route path="my-orders-return" element={<MyOrderReturn />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
        </DOMRoutes>
      </Suspense>
    </CommonProvider>
  );
};

export default Routes;
