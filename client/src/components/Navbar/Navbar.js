import memories from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className="navbar navbar-light bg-light mb-4 py-4">
      <div className="container-fluid">
        <div className="col-9">
          <a className="navbar-brand h1 mx-4" href="/">
            <img src={memoriesText} width="200" height="50" alt="Logo"></img>
            <img
              src={memories}
              alt="Memories"
              width="60"
              height="50"
              className="d-inline-block align-text-top mx-4"
            ></img>
          </a>
        </div>
        {user ? (
          <div className="col-3 d-flex justify-content-end">
            {user.userObject.picture ? (
              <div className="mx-2 align-self-center">
                <img
                  alt={user?.userObject.name}
                  src={user?.userObject.picture}
                ></img>
              </div>
            ) : (
              <div className="mx-2 align-self-center">
                <h1>{user?.userObject.name.charAt(0)}</h1>
              </div>
            )}
            <h6 className="mx-2 align-self-center mb-0">
              {" "}
              {user?.userObject.name}{" "}
            </h6>
            <button className="btn btn-dark mx-4" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <a href="/auth" className="btn btn-dark mx-4">
              Sign in
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
