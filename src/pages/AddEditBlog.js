import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import userEvent from "@testing-library/user-event";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { ProgressBar } from "react-toastify/dist/components";
import { db, storage } from "../firebase/firebase";

const initialState = {
  title: "",
  tags: [],
  category: "",
  trending: "",
  description: "",
};

const categoryOptions = [
  "Fashion",
  "Relationships",
  "Sports",
  "Business",
  "Food",
];

const AddEditBlog = (props) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progression, setProgression] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        toast.error("Image format must be jpg/jpeg/png/gif");
        return false;
      }
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + " done");
          setProgression(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
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
            toast.info("Image uploaded to server successfully!");
            setForm((prev) => ({ ...prev, imgUrl: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    props.setActive(null);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const tagHandler = (tags) => {
    setForm({ ...form, tags });
  };

  const trendingHandler = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const categoryHandler = (e) => {
    setForm({
      ...form,
      category: e.target.value,
    });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Image format must be jpg/jpeg/png/gif");
      return false;
    }
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: props.user.displayName,
            userId: props.user.uid,
            comments: [],
            likes: [],
          });
          toast.success("Blog created successfully!");
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: props.user.displayName,
            userId: props.user.uid,
          });
          console.log(form);
          toast.success("Blog updated successfully!");
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      return toast.error("All Fields must be fill!");
    }

    navigate("/");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text center heading py-2">
            {id ? "Update Blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={formHandler}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <ReactTagInput
                  tags={tags}
                  placeholder="Tags"
                  onChange={tagHandler}
                ></ReactTagInput>
              </div>
              <div className="col-12 py-3">
                <p className="trending">Is it trending blog ?</p>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="radio"
                    value="yes"
                    checked={trending === "yes"}
                    onChange={trendingHandler}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="radio"
                    value="no"
                    checked={trending === "no"}
                    onChange={trendingHandler}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No&nbsp;
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={categoryHandler}
                  className="catg-dropdown"
                >
                  <option>Please select a category</option>
                  {categoryOptions.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  name="description"
                  id=""
                  value={description}
                  placeholder="Description"
                  className="form-control description-box"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
                {progression === 0 ? null : (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped mt-1"
                      style={{ width: `${progression}% ` }}
                    >
                      Uploaded {progression} %
                    </div>
                  </div>
                )}
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  disabled={progression !== null && progression < 100}
                  className="btn btn-add"
                  type="submit"
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
