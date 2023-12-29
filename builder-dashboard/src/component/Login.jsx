import React from "react";
import AuthForm from "./Authform";
import "./login.css";
import Input from "./Input";
import logo from "./logo.png";
import { useState } from "react";

const Login = () => {
  const [signup, setSignup] = useState(false);
  const stateChange = () => {
    setSignup(!signup);
  };

  return (
    <div className="LoginMain">
      <div className="login">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* <div className='create'>
    <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_KvK0ZJBQzu.json"  background="transparent"  speed="1"  style={{width: '350px', height: '300px'}}  autoplay></lottie-player>
    <span onClick={stateChange}>{`${!signup ? 'create a new account' : 'sign in'}`}</span>
    </div> */}

        <div>
          <div className="form-title">
            <span>{"Log in to Citylytics"}</span>
          </div>
          <div className="form-subtitle">
            <span>{`Enter your email and password below`}</span>
            {/* error message work remaining  */}
          </div>
        </div>
        <AuthForm />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Login;
