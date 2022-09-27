import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { saveTokenLocalStorage } from "./Login";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = (props) => {
  const [state, setState] = useState(initialState);
  const [file, setFile] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [progress, setProgress] = useState(null);
  const [signup, setSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { email, password, firstName, lastName, confirmPassword } = state;
  const runLogoutTimer = (timer, dispatch) => {
    setTimeout(() => {
      dispatch(props.logoutHandler());
    }, timer);
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = "/profile/" + new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.status) {
            case "paused":
              console.log("upload is paused");
              break;
            case "running":
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.success("Image uploaded successfully!");
            setPhoto(downloadURL);
            setState((prevState) => ({
              ...prevState,
              img: downloadURL,
            }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((res) => {
        saveTokenLocalStorage(res._tokenResponse);
        runLogoutTimer(res._tokenResponse.expiresIn * 1000);
      });
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photo,
      });
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          photoURL: user.photoURL,
        });
      }
      toast.success("Credentials submitted successfully!");
      navigate("/");
    } catch (err) {
      toast.error(e.message);
    }

    props.setActive("home");
    // navigate("/login");
  };

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
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <div className="col-12 py-3 text-center">
              <button
                // isLoading={isSubmitting}
                disabled={progress !== null && progress < 100}
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
                <Link to="/login" style={{ textDecoration: "none" }}>
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
