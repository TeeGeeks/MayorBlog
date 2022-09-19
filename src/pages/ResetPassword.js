import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../firebase/firebase";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const query = useQuery();

  console.log(query.get("mode"));
  console.log(query.get("oobCode"));

  const handleHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password does not match!");
    }
    resetPassword(query.get("oobCode"), password)
      .then((res) => {
        console.log(res);
        return toast.success("Password reset successfully!");
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        return toast.error(err.message);
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
            <input
              type="password"
              className="form-control input-text-box"
              placeholder="New Password"
              name="password"
              // value={email}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row h-100 justify-content-center align-item-center">
          <div className="col-6 py-3">
            <input
              type="password"
              className="form-control input-text-box"
              placeholder="Confirm Password"
              name="confirmPassword"
              // value={email}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
