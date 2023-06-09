import React from "react";
import MainPageHeader from "./MainPageHeader/MainPageHeader.jsx";
import MainPageBody from "./MainPageBody/MainPageBody";
import MainPageFooter from "./MainPageFooter/MainPageFooter";
import { Navigate, useSearchParams } from "react-router-dom";

function MainPage() {
  return (
    <>
      <MainPageHeader />
      <MainPageBody />
      <MainPageFooter />
    </>
  );
}

export default MainPage;
