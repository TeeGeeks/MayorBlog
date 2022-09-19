import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import transitions from "bootstrap";
import ProfileImage from "../pages/ProfileImage";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

const Header = (props) => {
  const userId = props.user?.uid;
  const [img, setImg] = useState([]);
  useEffect(() => {
    const getImg = async () => {
      const ImageURL = await getDownloadURL(ref(storage, "profilePicture"));
      setImg(ImageURL);
    };
    getImg();
  }, []);

  console.log(img);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <div className="profile-log">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <img
                      src="/images/MayorBlog.jpg"
                      alt="logo"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "35%",
                        marginTop: "12px",
                      }}
                    />
                  </Link>
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      props.active === "home" ? "active" : ""
                    }`}
                    onClick={() => props.setActive("home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/write" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      props.active === "write" ? "active" : ""
                    }`}
                    onClick={() => props.setActive("write")}
                  >
                    Write
                  </li>
                </Link>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      props.active === "about" ? "active" : ""
                    }`}
                    onClick={() => props.setActive("about")}
                  >
                    About
                  </li>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      props.active === "contact" ? "active" : ""
                    }`}
                    onClick={() => props.setActive("contact")}
                  >
                    Contact
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="">
                        <Link to="/settings">
                          <ProfileImage
                            src={props.img}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              marginTop: "12px",
                            }}
                          />
                        </Link>
                      </div>
                      <p
                        style={{
                          marginTop: "12px",
                          marginLeft: "5px",
                          cursor: "alias",
                        }}
                      >
                        {props.user?.displayName}
                      </p>

                      <li
                        className="nav-item nav-link"
                        onClick={props.handleChangeLogout}
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          props.active === "login" ? "active" : ""
                        }`}
                        onClick={() => props.setActive("login")}
                      >
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
