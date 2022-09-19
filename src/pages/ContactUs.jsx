import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const ContactUs = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const { firstName, lastName, email, message } = form;

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (
      firstName.trim().length === "" ||
      lastName.trim().length === "" ||
      !email.includes("@") ||
      message.trim().length === ""
    ) {
      return toast.error("All Fields must be fill!!!");
    } else {
      await addDoc(collection(db, "contacts"), {
        ...form,
        timeStamp: serverTimestamp(),
      });
      toast.success("Message was sent successfully!");
      navigate("/");
    }
  };
  return (
    <div className="container-fluid mb-4">
      <div className="col-12 text-center">
        <div className="text-cent heading py-2">Contact Us</div>
      </div>
      <div className="row h-100 justify-content-center align-item-center">
        <div className="col-10 col-md-8 col-lg-6">
          <form className="row" onSubmit={formHandler}>
            <div className="col-12 py-3">
              {/* <label htmlFor="">Email</label> */}
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 py-3">
              {/* <label htmlFor="">Email</label> */}
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
              {/* <label htmlFor="">Email</label> */}
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
              <textarea
                name="message"
                id=""
                value={message}
                placeholder="Message"
                className="form-control description-box"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 py-3 text-center">
              <button className="btn-sign-up" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
