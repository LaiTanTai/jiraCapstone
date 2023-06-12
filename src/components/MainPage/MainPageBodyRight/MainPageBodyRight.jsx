import React, { Fragment } from "react";
import CardMain from "../../CardMain/CardMain";

function MainPageBodyRight() {
  return (
    <div
      style={{ display: "flex", gap: "10px", height: "100%", width: "100%" }}
    >
      <CardMain />
      <CardMain />
    </div>
  );
}

export default MainPageBodyRight;
