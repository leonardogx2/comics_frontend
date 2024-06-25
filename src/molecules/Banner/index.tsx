import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-48 sm:h-80 flex justify-center relative">
      <img
        src="banner_desktop.png"
        className="z-[100] object-center hidden sm:block object-cover"
      />
      <img
        src="banner_mobile.png"
        className="z-[100] object-center object-cover sm:hidden"
      />
      <div className="bg-default-light w-[50%] h-full top-0 left-0 absolute"></div>
      <div className="bg-default-red w-[50%] h-full top-0 right-0 absolute"></div>
    </div>
  );
};

export default Banner;
