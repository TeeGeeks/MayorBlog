import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  const runLogoutTimer = (timer, dispatch) => {
    setTimeout(() => {
      dispatch(props.logoutHandler());
    }, timer);
  };

  const handleAuthHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Credentials not valid");
    }
    setIsSubmitting(true);
    login(email, password)
      .then((res) => {
        saveTokenLocalStorage(res._tokenResponse);
        runLogoutTimer(res._tokenResponse.expiresIn * 1000);
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (!props.user) {
          toast.error("user not found!!!", err.message);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container-fluid mb-4">
      <div className="col-12 text-center">
        <div className="text-center heading py-2 mt-5">Sign-In</div>
      </div>
      <div className="row h-100 justify-content-center align-item-center">
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" onSubmit={handleAuthHandler}>
            <div className="col-12 py-3">
              <input
                type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="col-12 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="col-12 py-3 text-center">
              <button
                // isLoading={isSubmitting}
                className="btn btn-sign-in"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Forgot Password?&nbsp;
                <Link to="/forgotPassword" style={{ textDecoration: "none" }}>
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => setSignup(true)}
                  >
                    Click me!
                  </span>
                </Link>
              </p>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account ?&nbsp;
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => setSignup(true)}
                  >
                    Sign Up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

export const saveTokenLocalStorage = (tokenData) => {
  localStorage.setItem("userDetails", JSON.stringify(tokenData));
};
