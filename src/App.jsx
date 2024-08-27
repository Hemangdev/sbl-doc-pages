import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "react-multi-carousel/lib/styles.css";
import "../src/Components/homePage/style.css"
import "../src/Components/productPage/style.css"
import Routes from './Routes/Routes.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/'
  return (
    <BrowserRouter basename={basename} >
      <Routes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;