import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { stringifyText } from "../utility";
import LikeBlog from "./LikeBlog";

const BlogSection = (props) => {
  const userId = props.user?.uid;
  // console.log(userId);
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>

      {props.blogs.length === 0 ? (
        <p>No Blog Found!</p>
      ) : (
        props.blogs?.map((item) => (
          <div className="row pb-4" key={item.id}>
            <div className="col-md-5">
              <div className="hover-blogs-img">
                <div className="blogs-img">
                  <img src={item.imgUrl} alt={item.title} />
                  <div></div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="text-start">
                <h6 className="category catg-color">{item.category}</h6>
                <span className="title py-2">{item.title}</span>
                <span className="meta-info">
                  <p className="author">{item.author}</p> -&nbsp;
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className="short-description text-start">
                {stringifyText(item.description, 120)}
              </div>
              <Link to={`/detail/${item.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>
              <div className="d-flex flex-row-reverse">
                {props.user && (
                  <>
                    <LikeBlog
                      id={item.id}
                      likes={item.likes}
                      user={props.user}
                    />
                    <div className="pe-2">
                      <p>{item.likes.length} like(s)</p>
                    </div>
                  </>
                )}
              </div>

              {userId && item.userId === userId && (
                <>
                  <div style={{ float: "right" }}>
                    <FontAwesome
                      name="trash"
                      style={{ margin: "15px", cursor: "pointer" }}
                      size="lg"
                      onClick={() => props.handleDelete(item.id)}
                    />
                    <Link to={`/update/${item.id}`}>
                      <FontAwesome
                        name="edit"
                        style={{ cursor: "pointer" }}
                        size="lg"
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogSection;
