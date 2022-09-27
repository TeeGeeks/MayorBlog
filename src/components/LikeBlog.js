import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/firebase";

export default function LikeArticle({ id, likes, user }) {
  const likesRef = doc(db, "blogs", id);
  const [isClicked, setIsClicked] = useState(false);
  const [like, setLikes] = useState(0);

  const handleLike = (e) => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      }).then(() => {
        setLikes(like - 1);
        setIsClicked(true);
        // console.log("Liked");
      });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      }).then(() => {
        setLikes(like + 1);
        setIsClicked(false);
        // console.log("UnLiked");
      });
    }
    setIsClicked(!!isClicked);
  };
  return (
    <div className="d-flex flex-row-reverse">
      <i
        // className={`fa fa-heart${likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
        className="fa fa-heart fa-lg"
        style={{
          cursor: "pointer",
          color: !isClicked ? "red" : "lightgrey",
          //     color: `{${likes?.includes(
          //     user.uid
          //   )} ${isClicked} ? "red" : "lightgrey",}`,
        }}
        onClick={handleLike}
      ></i>
    </div>
  );
}
