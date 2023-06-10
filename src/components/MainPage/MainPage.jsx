import React from "react";
import MainPageHeader from "./MainPageHeader/MainPageHeader.jsx";
import { Navigate, useSearchParams } from "react-router-dom";
import MainPageBodyLeft from "./MainPageBodyLeft/MainPageBodyLeft.jsx";
import MainPageBodyRight from "./MainPageBodyRight/MainPageBodyRight.jsx";

function MainPage() {
  return (
    <>
      <MainPageHeader />
      <MainPageBodyLeft />
      <MainPageBodyRight />
    </>
  );
}

export default MainPage;
