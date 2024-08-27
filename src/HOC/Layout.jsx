import Footer from "../Components/include/Footer";
import Header from "../Components/include/Header";
import ScrollToTop from "../Components/include/ScrollToTop";

const Layout = ({ current }) => {
  return (
    <ScrollToTop>
      <Header />
      {current}
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;
