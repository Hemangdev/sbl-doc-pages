import SubHeader from "../../Components/SubHeader";
import Partners from "../../Components/Partners";
import Service from "../../Components/Service";
import InstaFollow from "../../Components/InstaFollow";
import LoginFrom from "../../Components/LoginFrom";
import MetaTags from "../../Components/MetaTags";

const Login = () => {
  return (
    <>
      <MetaTags data={{ title: 'Log in' }} />
      <SubHeader heading="Log in"></SubHeader>
      <LoginFrom></LoginFrom>
      <Partners></Partners>
      <InstaFollow></InstaFollow>
      <Service></Service>
    </>
  );
};

export default Login;
