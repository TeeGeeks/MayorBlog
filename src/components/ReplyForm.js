import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";

const ReplyForm = ({ comment, user, blog, id, index }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [reply, setReply] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();

    if (user) {
      if (!reply) return toast.dark("Please add reply!");

      const replyData = {
        userId: user.uid,
        reply,
        email: user.email,
        name: user.displayName,
      };
      const findPost = blog.find((blg) => blg.id === id);
      // (findPost.comments);
      const oldPost = findPost.comments;
      const replies = oldPost[index].replies;
      replies.push(replyData);
      oldPost[index].replies = replies;
      // console.log(replies);

      const docRef = doc(db, "blogs", id);
      updateDoc(docRef, {
        comments: oldPost,
      })
        .then((res) => {
          console.log(res);
          return toast.success("Reply added successfully!");
        })
        .catch((err) => {
          return toast.error(err.message);
        });

      setReply("");
      console.log(docRef);
    } else {
      if (!comment || !name || !email)
        return toast.dark("Please fill in all details!");
      const replyData = {
        userId: null,
        reply,
        email,
        name,
      };

      const findPost = blog.find((blg) => blg.id === id);
      // (findPost.comments);
      const oldPost = findPost.comments;
      const replies = oldPost[index].replies;
      replies.push(replyData);
      oldPost[index].replies = replies;
      // console.log(replies);

      const docRef = doc(db, "blogs", id);
      updateDoc(docRef, {
        comments: oldPost,
      })
        .then((res) => {
          console.log(res);
          return toast.success("Reply added successfully!");
        })
        .catch((err) => {
          return toast.error(err.message);
        });
      setReply("");
      setName("");
      setEmail("");
      // console.log(comData);
    }
  };

  return (
    <>
      {openReply ? (
        <form onSubmit={formHandler}>
          {user ? (
            <>
              <div className="col-12 py-3">
                <textarea
                  placeholder="Do reply ..."
                  className="form-control"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="me-3 btn text-primary">
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setOpenReply(false)}
                  className="me-3 btn text-danger"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
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
                  placeholder="Do reply ..."
                  className="form-control"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <button type="submit" className="me-3 btn text-primary">
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => setOpenReply(false)}
                  className="me-3 btn text-danger"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      ) : (
        <p
          className="btn text-primary text-start"
          onClick={() => setOpenReply(true)}
          style={{ cursor: "pointer" }}
        >
          Reply
        </p>
      )}
    </>
  );
};

export default ReplyForm;
