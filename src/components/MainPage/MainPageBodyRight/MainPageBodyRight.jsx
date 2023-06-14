import React, { Fragment, useState } from "react";
import CardMain from "../../CardMain/CardMain";
import Boards from "./Boards/Boards";
import CreateProject from "./CreateProject/CreateProject";
import UserManagement from "./UserManagement/UserManagement";

function MainPageBodyRight({ render }) {
  return (
    <div>
      {render == "Boards" ? (
        <Boards />
      ) : render == "CreateProject" ? (
        <CreateProject />
      ) : render == "UserManagement" ? (
        <UserManagement />
      ) : (
        ""
      )}
    </div>
  );
}

export default MainPageBodyRight;
