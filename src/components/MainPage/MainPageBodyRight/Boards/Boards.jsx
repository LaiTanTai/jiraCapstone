import React from "react";
import style from "./Boards.module.scss"
import CardMain from "../../../CardMain/CardMain";

function Boards() {
  return (
    <div className="container">
      <div className="row">
          <CardMain />
          <CardMain />
          <CardMain />
          <CardMain />
          <CardMain />
          <CardMain />
      </div>
    </div> 
  );
}

export default Boards;
