import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import Customize from "./Customize/Customize";
import Sponsor from "./Sponsor/Sponsor";
function FirstPageBody() {
  return (
    <>
      <Banner />
      <AboutUs />
      <Customize />
      <Sponsor />
    </>
  );
}

export default FirstPageBody;
