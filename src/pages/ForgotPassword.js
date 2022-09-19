import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../firebase/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const handleHandler = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email invalid!");
    }

    forgotPassword(email)
      .then((res) => {
        console.log(res);
        return toast.success("Check your email to reset your password!");
      })
      .catch((err) => {
        console.log(err);
        return toast.error("Error occurred!");
      });
  };
  return (
    <div className="container-fluid mb-5">
      <form className="row" onSubmit={handleHandler}>
        <div className="col-12 text-center">
          <div className="text-center heading py-2 mt-5">Forgot Password</div>
        </div>
        <div className="row h-100 justify-content-center align-item-center">
          <div className="col-6 py-3">
            {/* <label htmlFor="">Email</label> */}
            <input
              type="email"
              className="form-control input-text-box"
              placeholder="Email"
              name="email"
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 py-3  text-center">
          <button className="btn-sign-up" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
