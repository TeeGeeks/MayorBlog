import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  snapshotEqual,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../components/CommentsSection";
import LikeBlog from "../components/LikeBlog";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import { db } from "../firebase/firebase";
import Comments from "./Comment";

const Detail = (props) => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };
    getBlogsData();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef, (snapShot) => {
      setBlog({ ...snapShot.data(), id: snapShot.id });
    });
  }, [id]);

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start blog-text">{blog?.description}</p>
            </div>
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular blogs={blogs} />
            </div>
          </div>

          <Comments user={props.user} id={blog?.id} blog={blogs} />
          <div className="">
            <CommentsSection
              blog={blog}
              blogs={blogs}
              user={props.user}
              id={blog?.id}
            />
            {/* {JSON.stringify(blog?.comments)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
