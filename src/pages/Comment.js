import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import Settings from "./Settings";

const Comments = ({ user, id, blog }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState([]);

  const formHandler = async (e) => {
    e.preventDefault();

    if (user) {
      if (!comment) {
        return toast.dark("Please add comment!");
      }
      const comData = {
        userId: user.uid,
        comment,
        email: user.email,
        name: user.displayName,
        replies: [],
      };
      const findPost = blog.find((blg) => blg.id === id);
      // (findPost.comments);
      const comments = findPost.comments;
      comments.push(comData);
      const docRef = doc(db, "blogs", id);
      updateDoc(docRef, {
        comments,
      })
        .then((res) => {
          console.log(res);
          return toast.success("Comment added successfully!");
        })
        .catch((err) => {
          return toast.error(err.message);
        });

      setComment("");
      // console.log(docRef);
    } else {
      if (!comment || !name || !email)
        return toast.dark("Please fill in all details!");
      const comData = {
        userId: null,
        comment,
        email: email,
        name: name,
        replies: [],
      };

      const findPost = blog.find((blg) => blg.id === id);
      // (findPost.comments);
      const comments = findPost.comments;
      comments.push(comData);
      const docRef = doc(db, "blogs", id);
      updateDoc(docRef, {
        comments,
      })
        .then((res) => {
          console.log(res);
          return toast.success("Comment added successfully!");
        })
        .catch((err) => {
          return toast.error(err.message);
        });
      setComment("");
      setName("");
      setEmail("");
      // console.log(comData);
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="row h-100 ">
        <div className="col-12 col-md-8 col-lg-6">
          <hr />
          <form className="row" onSubmit={formHandler}>
            <div className=" heading py-2">Comments</div>
            {user ? (
              <div className="col-12 py-3">
                <textarea
                  name="message"
                  id=""
                  value={comment}
                  placeholder="Message"
                  className="form-control description-box"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            ) : (
              <div className="col-12 py-3 gap-2">
                <input
                  type="text"
                  className="form-control input-text-box mb-2"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control input-text-box mb-2"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  name="message"
                  id=""
                  value={comment}
                  placeholder="Message"
                  className="form-control description-box"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            )}
            <div className="col-12 py-3 text-center">
              <button className="btn-sign-up" type="submit">
                Add a comment
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Settings id={id} blog={blog} /> */}
    </div>
  );
};

export default Comments;
