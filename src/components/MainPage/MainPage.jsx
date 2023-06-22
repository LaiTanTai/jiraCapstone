import React, { Fragment, useState } from "react";
import MainPageHeader from "./MainPageHeader/MainPageHeader.jsx";
import { Navigate, useSearchParams } from "react-router-dom";
import MainPageBodyLeft from "./MainPageBodyLeft/MainPageBodyLeft.jsx";
import MainPageBodyRight from "./MainPageBodyRight/MainPageBodyRight.jsx";
import "./MainPage.scss";
import SideBar from "./SideBar/SideBar.jsx";

function MainPage() {
  const [open, setOpen] = useState(true);
  const [render, setRender] = useState("Boards");
  return (
    <>
      <MainPageHeader />
      <div className="MainPage">
        <div className={`${open ? "sideBarOpen" : "sideBarClose"}`}>
          <SideBar />
        </div>
        <div className={`${open ? "pageLeftOpen" : "pageLeftClose"}`}>
          <MainPageBodyLeft
            open={open}
            setRender={setRender}
            setOpen={setOpen}
          />
        </div>
        <div
          className={`${open ? "pageRightOpen" : "pageRightClose"}`}
        >
          <MainPageBodyRight render={render} />
        </div>
      </div>
    </>
  );
}

export default MainPage;