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
    <div style={{ margin: "0" }}>
      <MainPageHeader />
        <div className="MainPage" style={{ width: "100%" }}>
          <div style={{display:"flex",width:"300px",justifyContent:"space-between"}} className={`${open ? "sideBarOpen" : "sideBarClose"}`}>
            <div>
            <SideBar />
            </div>
            <div style={{marginLeft:"20px"}}>
            <MainPageBodyLeft
                open={open}
                setRender={setRender}
                setOpen={setOpen}
              />
            </div>
          </div>
          <div
            className={`${open ? "pageRightOpen" : "pageRightClose"}`}
          >
            <MainPageBodyRight render={render} />
          </div>
      </div>
    </div>
  );
}

export default MainPage;
