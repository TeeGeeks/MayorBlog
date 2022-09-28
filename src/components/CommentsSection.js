import { deleteField, doc, updateDoc } from "firebase/firestore";
import React from "react";
import FontAwesome from "react-fontawesome";
import { toast } from "react-toastify";
import { db } from "../firebase/firebase";
import ShowReplies from "../pages/ShowReplies";
import ReplyForm from "./ReplyForm";

const CommentsSection = ({ blog, user, id, blogs }) => {
  return (
    <div>
      <div className="container">
        <div className="col-md-4 col-md-4 col-lg-6">
          <hr />
          <span style={{ fontWeight: "bold" }}> Comments</span>

          {blog?.comments.map((comment, index) => (
            <div
              key={index * 9999}
              className="w-100 card my-2 border px-5 py-3 border-grey"
            >
              <div className="w-100 d-flex  justify-content-between">
                <div className="d-flex">
                  <div>
                    <p className="my-0 card-title" style={{ color: "grey" }}>
                      {comment.name}
                    </p>
                    <p
                      className="my-0 card-text small fst-italic "
                      style={{ color: "grey" }}
                    >
                      {comment.email}
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-1  ">
                  {comment.userId === blog.userId && (
                    <p className="bg-dark text-white py-1 px-2 fst-italic">
                      Author
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-4 text-start">{comment.comment}</p>
              <ShowReplies allReplies={comment.replies} />
              <ReplyForm
                comment={comment}
                user={user}
                id={id}
                blog={blogs}
                index={index}
              />
              {user && user.uid === blog.userId && comment.userId && (
                <FontAwesome
                  name="trash"
                  className="my-2 text-end"
                  style={{ margin: "10px", cursor: "pointer" }}
                  size="lg"
                  onClick={() => {
                    const currentPost = blogs.find((pst) => pst.id === id);
                    const comment = currentPost.comments.filter(
                      (cat, i) => i !== index
                    );
                    const docRef = doc(db, "blogs", id);
                    updateDoc(docRef, {
                      comments: comment,
                    })
                      .then((res) => {
                        console.log(res);
                        return toast.success("Deleted comment successfully!");
                      })
                      .catch((err) => {
                        return toast.error(err.message);
                      });
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
