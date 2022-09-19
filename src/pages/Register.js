import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = (props) => {
  const [state, setState] = useState(initialState);
  const [signup, setSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { email, password, firstName, lastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthHandler = async (e) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      toast.error("Credentials not valid!");
    }
    if (password !== confirmPassword) {
      return toast.error("Password don't match !!!");
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      return toast.error("Password must be 6 characters long !!!");
    }
    setIsSubmitting(true);
    // const { user } = register(email, password)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        toast.success("Credentials submitted successfully!");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
    props.setActive("home");
    // navigate("/login");
  };
  //   if (!signup) {
  //     if (email && password) {
  //       const { user } = await signInWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       if (!user) {
  //         toast.error("User does not exists!");
  //       }
  //       props.setActive("home");
  //     } else {
  //       return toast.error("Password does not match!");
  //     }
  //   } else {
  //     if (password !== confirmPassword) {
  //       return toast.error("Password don't match!!!");
  //     }
  //     if (password.length < 6 || confirmPassword.length < 6) {
  //       return toast.error("Password must not be less than six characters!");
  //     }
  //     if (firstName && lastName && email && password) {
  //       const { user } = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       ).then((res) => {
  //         return navigate("/");
  //       });
  //       await updateProfile(user, { displayName: `${firstName} ${lastName}` });
  //       props.setActive("home");
  //     } else {
  //       return toast.error("All fields must be filled!");
  //     }
  //   }
  //   navigate("/");
  // };

  return (
    <div className="container-fluid mb-4">
      <div className="col-12 text-center">
        <div className="text-center heading py-2 mt-5">Sign-Up</div>
      </div>
      <div className="row h-100 justify-content-center align-item-center">
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" onSubmit={handleAuthHandler}>
            <div className="col-6 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 py-3">
              <input
                type="email"
                className="form-control input-text-box"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 py-3">
              <input
                type="password"
                className="form-control input-text-box"
                placeholder="Confirm Password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
              />
            </div>

            <div className="col-12 py-3 text-center">
              <button
                // isLoading={isSubmitting}
                className="btn btn-sign-up"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <div className="text-center justify-content-center mt-2 pt-2">
              <p className="small fw-bold mt-2 pt-1 mb-10">
                Already have an account ?&nbsp;
                <Link to="/login">
                  <span
                    className="link-danger"
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#298af2",
                    }}
                    onClick={() => setSignup(false)}
                  >
                    Sign In
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
