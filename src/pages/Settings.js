import "@pathofdev/react-tag-input/build/index.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { upload } from "../firebase/firebase";
import ProfileImage from "./ProfileImage";

const Settings = ({ user, onImg }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, user, setLoading);
    toast.success("Image uploaded successfully!");
    navigate("/");
  }

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);

      // toast.success("Image uploaded successfully!");
    }
  }, [user]);

  onImg(photoURL);
  // window.location.reload(false);

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text center heading py-2">
            Update Your Profile Image
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="mb-3">
              <ProfileImage
                src={photoURL}
                style={{
                  width: "180px",
                  height: "200px",
                  borderRadius: "50%",
                  marginTop: "12px",
                }}
              />
              {/* <Avatar alt="" src={""} sx={{ width: 150, height: 150 }} /> */}
              <input
                type="file"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-add col-12 py-3 text-center"
              onClick={handleClick}
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
