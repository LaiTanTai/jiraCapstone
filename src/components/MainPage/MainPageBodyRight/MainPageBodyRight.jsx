import React, { Fragment, useState } from "react";
import CardMain from "../../CardMain/CardMain";
import Boards from "./Boards/Boards";
import CreateProject from "./CreateProject/CreateProject";
import UserManagement from "./UserManagement/UserManagement";
import ProjectManagement from "./ProjectManagement/ProjectManagement";

function MainPageBodyRight({ render }) {
  return (
    <div style={{marginLeft:"20px"}}>
      {render == "Boards" ? (
        <Boards />
      ) : render == "CreateProject" ? (
        <CreateProject />
      ) : render == "UserManagement" ? (
        <UserManagement />
      ) : render == "ProjectManagement" ? (
        <ProjectManagement />
      ) : (
        ""
      )}
    </div>
  );
}

export default MainPageBodyRight;
