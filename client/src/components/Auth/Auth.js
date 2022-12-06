import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    var token = response.credential;
    var userObject = jwt_decode(response.credential);

    document.getElementById("signInDiv").hidden = true;

    try {
      dispatch({ type: "AUTH", data: { userObject, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignOut(event) {
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "792913670363-i5g3ieh6kfovjobbtuqbqttvoalstkat.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  */

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <div className="bg-white px-3 pt-3 pb-1">
      <div className="row">
        <div className="col-12">
          <LockOutlinedIcon />
        </div>
        <div className="col-12 mb-1">
          <h1>{isSignup ? "Sign up" : "Sign in"}</h1>
        </div>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 mb-1">
            <div className="form-group">
              {isSignup && (
                <>
                  <input
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    autoFocus
                  />
                  <input
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    half
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-group">
              <input
                name="email"
                label="Email Address"
                onChange={handleChange}
                type="email"
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-group">
              <input
                name="password"
                label="Password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
              />
            </div>
          </div>
          <div className="col-12 mb-3">
            <div className="form-group">
              {isSignup && (
                <input
                  label="Repeat Password"
                  onChange={handleChange}
                  type="password"
                />
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-dark">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
          <div id="signInDiv"></div>
          <button onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
