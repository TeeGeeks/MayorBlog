// import { Avatar } from "@mui/material";
import React from "react";

const ProfileImage = ({ src, style }) => {
  const onErr = (e) => {
    e.target.src =
      "https://www.kindpng.com/picc/m/22-223863_no-avater-png-cirlce-transparent-png.png";
  };
  console.log(src);

  return (
    <div>
      <img src={src} alt="" onError={onErr} style={style} />
    </div>
  );
};

export default ProfileImage;
