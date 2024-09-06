import { Link } from "react-router-dom";
import useProfile from "../../Hooks/useProfile";
import useSetting from "../../Hooks/useSetting";
import NewsLetter from "./NewsLetter";
// import Support from "../../image/support.svg";
import { Row, Col } from "react-bootstrap";
import Location from "../../image/location.svg";
import MobileIcon from "../../image/mobile-icon.svg";
import EmailIcon from "../../image/email-icon.svg";
import WorkingHours from "../../image/working-hours.svg";
import WhatsappIcon from "../../image/whatsapp.svg";
import Logo from "../../image/footer-logo.jpeg";
import SafeLogo from "../../image/safe.svg";
import Natural from "../../image/natural.svg";
import Effactive from "../../image/effactive.svg";
import GmpCertified from "../../image/gmp-certified.svg";
import IsoCertified from "../../image/iso-certified.svg";
import MakeInIndia from "../../image/make-in-india.svg";

const public_path = process.env.REACT_APP_PUBLIC_URL;

const Footer = () => {
  const { id } = useProfile();
  const { copyright, topCats, address } = useSetting();
  return (
    <>
      <footer>
        <div className="container">
          <div className="row mb-4">
            <div className="col text-md-center text-left">
              <a href="/" className="footer-logo-top">
                <img src={Logo} alt="Logo" width="100" height="132" />
              </a>
            </div>

            <div className="col-9 right-content">
              <div className="footer-logo-list">
                <ul class="list-inline">
                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={Natural}
                      alt="Natural Logo"
                      width="87"
                      height="87"
                    />
                    {/* </a> */}
                  </li>
                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={SafeLogo}
                      alt="Safe Logo"
                      width="100"
                      height="80"
                    />

                    {/* </a> */}
                  </li>

                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={Effactive}
                      alt="Effactive"
                      width="80"
                      height="90"
                    />

                    {/* </a> */}
                  </li>

                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={MakeInIndia}
                      alt="Make In India"
                      width="135"
                      height="80"
                    />
                    {/* </a> */}
                  </li>

                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={GmpCertified}
                      alt="Certified"
                      width="87"
                      height="87"
                    />
                    {/* </a> */}
                  </li>

                  <li class="list-inline-item">
                    {/* <a href="#"> */}
                    <img
                      src={IsoCertified}
                      alt="Certified"
                      width="87"
                      height="87"
                    />
                    {/* </a> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="support-box">
                <ul class="list-unstyled mb-0">
                  <li>
                    <p className="mb-0">Support</p>
                  </li>
                  <li>
                    <span>
                      <img
                        src={Location}
                        alt="Location"
                        width="25"
                        height="28"
                      />
                    </span>{" "}
                    <span>{address}</span>
                  </li>

                  <li>
                    <span>
                      <img
                        src={MobileIcon}
                        alt="Location"
                        width="20"
                        height="22"
                      />
                    </span>{" "}
                    <span>
                      <a
                        className="text-decoration-none text-white"
                        href="tel:+91-11-43731000"
                      >
                        +91-11-43731000
                      </a>
                      ,{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="tel:22161935"
                      >
                        22161935
                      </a>
                      ,{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="tel:22165145"
                      >
                        22165145
                      </a>
                      ,{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="tel:22162239"
                      >
                        22162239
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <img
                        src={WhatsappIcon}
                        alt="Location"
                        width="20"
                        height="22"
                      />
                    </span>{" "}
                    <span>
                      <a
                        className="text-decoration-none text-white"
                        href={`https://wa.me/8851654420`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        8851654420
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <img
                        src={EmailIcon}
                        alt="Location"
                        width="20"
                        height="20"
                      />
                    </span>{" "}
                    <span>
                      <a
                        className="text-decoration-none text-white"
                        href="mailto:care@sblglobal.in"
                      >
                        care@sblglobal.in
                      </a>
                      ,<br /> E-commerce:{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="mailto:onlinecare@sblglobal.in"
                      >
                        onlinecare@sblglobal.in
                      </a>
                      ,<br /> Export Support:{" "}
                      <a
                        className="text-decoration-none text-white"
                        href="mailto:exportcare@sblglobal.in"
                      >
                        exportcare@sblglobal.in
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <img
                        src={WorkingHours}
                        alt="Location"
                        width="20"
                        height="20"
                      />
                    </span>{" "}
                    <span>
                      9:00 am – 5:30 pm from Mon. to Sat.
                      <br />
                      (Except Public Holidays)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-8 d-grid footer-link-col">
              <div className="row g-0 justify-content-between">
                <div className="col-md-2">
                  <div className="footer-link">
                    <ul className="list-unstyled">
                      <h6>Useful Links</h6>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/career`}
                        >
                          Career
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/contact-us`}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/dealer-locator`}
                        >
                          Dealer Locator
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/certificate-download`}
                        >
                          Certificate
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="footer-link">
                    <ul className="list-unstyled">
                      <h6>Products</h6>
                      {topCats.map((item, i) => (
                        <li key={i}>
                          <Link
                            className="text-decoration-none text-white"
                            to={`${public_path}/product/${item?.slug}`}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="footer-link">
                    <ul className="list-unstyled">
                      <h6>My Accounts</h6>
                      {id ? (
                        <>
                          <li>
                            <Link
                              className="text-decoration-none text-white"
                              to={`${public_path}/profile`}
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-decoration-none text-white"
                              to={`${public_path}/cart`}
                            >
                              Cart
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="text-decoration-none text-white"
                              to={`${public_path}/checkout`}
                            >
                              Checkout
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link
                            className="text-decoration-none text-white"
                            to={`${public_path}/login`}
                          >
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="footer-link">
                    <ul className="list-unstyled">
                      <h6 className="fw-bold">Guide & Help</h6>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/faq-help`}
                        >
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/blogs`}
                        >
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/testimonial`}
                        >
                          Testimonial
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="footer-link">
                    <ul className="list-unstyled">
                      <h6>Company Policy</h6>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/disclaimer`}
                        >
                          Disclaimer
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/privacy-policy`}
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/returns-exchanges`}
                        >
                          Returns & Exchanges
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/delivery-information`}
                        >
                          Delivery Information
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/terms-conditions`}
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      {/* <li><Link className="text-decoration-none text-white" to={`${public_path}/news`}>News</Link></li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-8 mt-auto">
                  <h6 className="text-white foottextwhite">
                    {" "}
                    Get Updates & Stay Connected{" "}
                  </h6>
                  <NewsLetter />
                </div>
                <div className="col-md-4 mt-auto download-button">
                  <Link
                    className="btn btn-success btn-lg"
                    to={`${public_path}/download`}
                  >
                    Download Catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Row className="mt-4">
		  <Col xs={12} md={12} className="text-center border-bottom border-top pt-2 mb-3"><h4 className="text-white">Useful Links</h4></Col>
            <Col xs={6} md={3}>
			<ul className="list-unstyled">
			    <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product/hair-care`}
                        >
                         Hair Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/alfalfa-1307`}
                        >
                         Mother Tinctures
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/alfalfa-1895`}
                        >
                          Dilutions
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/alfalfa-malt-1667`}
                        >
                          General Weakness
                        </Link>
                </li>
			</ul>
            </Col>
			
            <Col xs={6} md={3}>
			<ul className="list-unstyled">
			    <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/alfalfa-tonic-paediatric-1666`}
                        >
                         Baby Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/alfalfa-tonic-with-ginseng-1323-1668`}
                        >
                        Liquids Specialities
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/sbl-drops-no-4-1695`}
                        >
                          Cardiac Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/kalmegh-syrup-1679`}
                        >
                          Stomach Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/sbl-stobal-cough-syrup-sugar-free-1703`}
                        >
                         Cough & Cold
                        </Link>
                </li>
			</ul>
            </Col>
            <Col xs={6} md={3}>
            <ul className="list-unstyled">
			    <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/liv-t-1680`}
                        >
                          Liquids Specialities
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/liv-t-paediatric-1681`}
                        >
                         Liquids Specialities
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/montana-hair-oil-33`}
                        >
                         Hair Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/montana-herbal-shampoo-34`}
                        >
                          Hair Care
                        </Link>
                </li>
			</ul>
            </Col>
			<Col xs={6} md={3}>
			<ul className="list-unstyled">
			    <li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/montana-herbal-shampoo-combo`}
                        >
                          Hair Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/montana-herbal-shampoo-conditioner-35`}
                        >
                          Hair Care
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/phytolacca-berry-tablets-1734`}
                        >
                          Weight Management
                        </Link>
                </li>
				<li>
                        <Link
                          className="text-decoration-none text-white"
                          to={`${public_path}/product-details/sbl-stobal-cough-syrup-1702`}
                        >
                         Liquids Specialities
                        </Link>
                </li>
			</ul>
            </Col>
          </Row>
        </div>
        {/* <hr className="mt-2 mb-0 bg-white" /> */}
        <div className="copy-right-area">
          <div className="container">
            <div className="row small-text-white">
              <div className="col-12">
                <div className="copy-right-row">
                  <div>
                    <span>{copyright}</span>
                  </div>

                  {/* <div className="copy-right-content">
										<p>Web Design &amp; Development by <a href="https://www.digitalxplode.com" target="_blank" rel="noreferrer">Digital Xplode</a> </p>
									</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
