import React, { Fragment, useState } from "react";
import CardMain from "../../CardMain/CardMain";
import Boards from "./Boards/Boards";
import CreateProject from "./CreateProject/CreateProject";

function MainPageBodyRight({ render }) {
  return (
    <div>
      {render == "Boards" ? (
        <Boards />
      ) : "CreateProject" ? (
        <CreateProject />
      ) : (
        ""
      )}
    </div>
  );
}

export default MainPageBodyRight;
