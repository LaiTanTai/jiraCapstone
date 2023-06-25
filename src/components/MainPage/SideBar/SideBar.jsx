import React from "react";
import "./SideBar.css";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { Space } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  BulbOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

function SideBar() {
  const navigate = useNavigate();
  const handleCreateTask = () => {
    return navigate("/Main/CreateTask");
  };

  return (
    <>
      <div className="sideBar">
        <div className="sideBar-top">
          <div className="sideBar-icon">
            <Space>
              <BulbOutlined style={{ color: "#fff" }} />
            </Space>
          </div>
          <div
            className="sideBar-icon"
            data-toggle="modal"
            data-target="#searchModal"
            style={{ cursor: "pointer" }}
          >
            <Space>
              <SearchOutlined style={{ color: "#fff", fontSize: "20px" }} />
              <span className="title">SEARCH TASK</span>
            </Space>
          </div>
          <div
            className="sideBar-icon"
            style={{ cursor: "pointer" }}
            onClick={handleCreateTask}
          >
            <Space>
              <PlusOutlined style={{ color: "#fff", fontSize: "20px" }} />
              <span className="title">CREATE TASK</span>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
