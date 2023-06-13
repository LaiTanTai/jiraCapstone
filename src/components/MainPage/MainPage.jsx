import React, { Fragment, useState } from "react";
import MainPageHeader from "./MainPageHeader/MainPageHeader.jsx";
import { Navigate, useSearchParams } from "react-router-dom";
import MainPageBodyLeft from "./MainPageBodyLeft/MainPageBodyLeft.jsx";
import MainPageBodyRight from "./MainPageBodyRight/MainPageBodyRight.jsx";
import "./MainPage.scss";

function MainPage() {
  const [open, setOpen] = useState(true);
  const [render, setRender] = useState("Boards");
  return (
    <div style={{ margin: "0" }}>
      <MainPageHeader />
      <div className="MainPage" style={{ width: "100%" }}>
        <div className={`${open ? "pageLeftOpen" : "pageLeftClose"}`}>
          <MainPageBodyLeft
            open={open}
            setRender={setRender}
            setOpen={setOpen}
          />
        </div>
        <div style={{marginLeft:"20px"}} className={`${open ? "pageRightOpen" : "pageRightClose"}`}>
          <MainPageBodyRight render={render} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
