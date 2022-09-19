import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogSection from "../components/BlogSection";
import MostPopular from "../components/MostPopular";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import Trending from "../components/Trending";
import { db } from "../firebase/firebase";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlog] = useState([]);
  const [tags, setTags] = useState([]);
  const [setTrendBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "**", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const unSub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlog(list);
        setLoading(false);
        props.setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unSub();
      getTrendingBlogs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete that blog")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully!");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("blogs", blogs);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={blogs} />
          <div className="col-md-8">
            <BlogSection
              blogs={currentPosts}
              user={props.user}
              handleDelete={deleteHandler}
            />
            <Pagination
              paginate={paginate}
              postsPerPage={postsPerPage}
              totalPosts={blogs.length}
            />
          </div>

          <div className="col-md-3">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
