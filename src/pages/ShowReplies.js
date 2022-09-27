import React, { useState } from "react";

const ShowReplies = ({ allReplies }) => {
  const [replies, setReplies] = useState(false);

  const handleClick = () => {
    setReplies((prevRep) => !prevRep);
  };
  return (
    <div>
      <span className="mt-2 text-start" style={{ fontWeight: "bold" }}>
        Replies:-
      </span>
      {allReplies.length > 0 ? (
        replies && (
          <div className="w-100 my-2">
            {allReplies.map((reply, index) => (
              <div
                key={index * 9999}
                className="w-100 card my-2 border-top px-5 py-3 border-grey"
              >
                <div className="w-100 d-flex  justify-content-between">
                  <div className="d-flex">
                    <div>
                      <p className="my-0 card-title" style={{ color: "grey" }}>
                        {reply.name}
                      </p>
                      <p
                        className="my-0 card-text small"
                        style={{ color: "grey" }}
                      >
                        {reply.email}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-1  ">
                    {reply.userId && (
                      <p className="bg-dark text-white py-1 px-2 fst-italic">
                        Author
                      </p>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-start">{reply.reply}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="w-100 my-2">
          <p className="text-center my-0">No Replies</p>
        </div>
      )}

      {allReplies.length > 0 && (
        <button className="btn text-primary mt-2 " onClick={handleClick}>
          {replies ? "Hide" : "View"} {allReplies.length} reply(s)
        </button>
      )}
    </div>
  );
};

export default ShowReplies;
