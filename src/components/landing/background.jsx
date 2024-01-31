import React from "react";
import Background from "../../assets/traffic-road-sign.jpg";

const ImageBack = ({ big = true }) => {
  const overlayClass = big
    ? "h-full w-full absolute inset-0 bg-black opacity-50"
    : "h-16 w-full absolute inset-0 bg-black opacity-50"; // Juster høyde og gjennomsiktighet etter behov

  return (
    <div className="relative">
      <img
        className="w-full h-auto"
        src={Background}
        alt="BackgroundSign"
      />
      <div className={overlayClass}></div>
    </div>
  );
};

export default ImageBack;
