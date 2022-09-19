import React from "react";

function About() {
  return (
    <div className="container padding">
      <div className="col-md-12">
        <div className="row mx-0">
          <div className="display-flex">
            <img
              src="/images/mayor.jpg"
              alt="Mayor Picture"
              style={{
                width: "40%",
                height: "450px",
                borderRadius: "25%",
                marginTop: "12px",
              }}
            />
            <h2 className="mt-2">OLUSEGUN MAYOWA MATTHEW</h2>
          </div>

          <p className="mb-5">
            Was born in the early 90s to Mr and Mrs Olusegun,He spent his
            childhood in Lagos,were his journey of education started at Rabbi
            international School,and proceeded for his SSCE at Bolson college,he
            further his education were he did his National Diploma at wolex
            polytechnic a private institution at iwo and proceeded for his
            Higher Diploma at Gateway polytechnic,he is a graduate today of
            Business Administration and he has served his country
            faithfully,MAYOWA is a prominent young man who love to see everyone
            around him smile,he is friendly,warm and calm to flow with,he is an
            intellectual who loves to educate and lead his fellow human to the
            right way of doing things right,he is a motivational speaker,A
            relationship Therapist and he is currently working as a content
            writer,he loves music, movies, reading, writing and most times goes
            on tour for sight seeing
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
