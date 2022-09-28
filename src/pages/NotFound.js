import React from "react";

const NotFound = () => {
  return (
    <div className="bg-grey mt-5 text-align-center justify-content-center">
      <h1
        className=""
        style={{ fontWeight: "bolder", fontSize: "6rem", fontStyle: "italic" }}
      >
        404
      </h1>
      <p
        className=""
        style={{ fontWeight: "bold", fontSize: "3rem", color: "grey" }}
      >
        Page Not Found!!!
      </p>
    </div>
  );
};

export default NotFound;
