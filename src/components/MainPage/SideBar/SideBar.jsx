import React from "react";
import "./SideBar.css";
import { Space } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  BulbOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

function SideBar() {
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
              <span className="title">SEARCH ISSUES</span>
            </Space>
          </div>
          <div className="sideBar-icon">
            <Space>
              <PlusOutlined style={{ color: "#fff", fontSize: "20px" }} />
              <span className="title">CREATE ISSUES</span>
            </Space>
          </div>
        </div>
        <div className="sideBar-bottom pb-5 mb-3">
          <div className="sideBar-icon">
            <Space>
              <QuestionOutlined style={{ color: "#fff", fontSize: "20px" }} />
              <span className="title">ABOUT</span>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
