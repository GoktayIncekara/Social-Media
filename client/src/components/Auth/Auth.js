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
  /*
  function handleSignOut(event) {
    document.getElementById("signInDiv").hidden = false;
  }
  */

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
  const [matched, setMatched] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.confirmPassword === formData.password) {
        setMatched(true);
        dispatch(signup(formData, navigate));
      } else {
        setMatched(false);
      }
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setMatched(true);
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-lg-6">
        <form className="bg-white p-4 mx-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-1">
              <LockOutlinedIcon />
            </div>
            <div className="col-12">
              <legend className="text-center">
                {isSignup ? "Sign up" : "Sign in"}
              </legend>
            </div>
            <div className="col-12 mb-3">
              <div className="form-group">
                {isSignup && (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control mb-3"
                      placeholder="First Name"
                      onChange={handleChange}
                      autoFocus
                    />
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
              </div>
            </div>
            <div className="col-12 my-3">
              <div className="form-group">
                {isSignup && (
                  <input
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                  />
                )}
              </div>
            </div>
            <div className="mb-3 form-check mx-3">
              <input
                type="checkbox"
                className="form-check-input"
                onClick={handleShowPassword}
              />
              <label className="form-check-label">Show Password</label>
            </div>
            <button type="submit" className="btn btn-dark mb-3">
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
            <div>
              <h1>{!matched && "Passwords do not match!"}</h1>
            </div>
            <button
              type="button"
              className="btn btn-danger mb-3"
              onClick={switchMode}
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign Up"}
            </button>
            <div id="signInDiv"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
