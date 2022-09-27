import React from "react";

function About() {
  return (
    <>
      <div className="center-vertical bg-dark">
        <div className="about-us-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12 co-lg-6 mb-4 mb-lg-0"></div>
              <div className="section-split">
                <div className="img-head">
                  <img
                    className="imgHead"
                    src="images/mayor.jpg"
                    alt=""
                    style={{
                      width: "40%",
                      height: "400px",
                      borderRadius: "10%",
                      marginTop: "25px",
                      marginBottom: "12px",
                    }}
                  />
                  <div className="break-small mb-2"></div>
                  <h1 className="text-head">KNOW MORE ABOUT ME</h1>
                  <p className="text-para">
                    Koko myles is a prolific writer who has passion for writing
                    and educating others,that why this platform was setup for
                    readers to understand some certain things about lifestyle,
                    relationship,and about the youth,there will be quotes,poems
                    and article write ups too Welcome to my world
                  </p>

                  <div className="box">
                    <i className="fa fa-user fa-lg"></i>
                    <h4 className="mb-0">Hello World!!!</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
