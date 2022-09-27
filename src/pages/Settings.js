import "@pathofdev/react-tag-input/build/index.css";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, storage } from "../firebase/firebase";

import ProfileImage from "./ProfileImage";

const Settings = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoUrl] = useState(null);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        toast.error("Image format must be jpg/jpeg/png/gif");
        return false;
      }
      const name = "/profile/" + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setProgress(progress);
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
            setPhotoUrl(downloadURL);
            // setState((prevState) => ({
            //   ...prevState,
            //   img: downloadURL,
            // }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(photoURL);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Image format must be jpg/jpeg/png/gif");
      return false;
    }

    if (file) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
          photoURL: photoURL,
        });
        toast.success("Profile Updated Successfully!");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text center heading py-2">Update Your Profile</div>
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
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="col-12 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="First Name"
                name="firstName"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="col-12 py-3">
              <input
                type="text"
                className="form-control input-text-box"
                placeholder="Last Name"
                name="lastName"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button
              className="btn btn-add col-12 py-3 text-center"
              onClick={submitHandler}
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
