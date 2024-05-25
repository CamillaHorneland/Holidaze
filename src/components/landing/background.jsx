import React from "react";
import Background from "../../assets/traffic-road-sign.jpg";

const ImageBack = ({ big = true }) => {
  const overlayClass = big
    ? "h-full w-full absolute inset-0 bg-black opacity-50"
    : "h-16 w-full absolute inset-0 bg-black opacity-50"; 

  return (
    <div className="relative">
      <img
        className="cover"
        src={Background}
        alt="BackgroundSign"
      />
      <div className={overlayClass}></div>
    </div>
  );
};

export default ImageBack;
