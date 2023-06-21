import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import style from "./Antd_Button.module.scss";
import { apiremoveUser } from "../../../apis/projectAPI";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Pagination,
  Table,
} from "react-bootstrap";

function Antd_Button({ members, project }) {
  console.log("members", members);
  const handleRemoveUser = async (value) => {
    try {
      const payload = {
        userId: value,
        projectId: project,
      };
      const data = await apiremoveUser(payload);
      console.log("dataa", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle>
          <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <div className="text-center">Members</div>
            <div className="mt-3">
              <Table bordered hover>
                <thead>
                  <tr className="text-dark text-center">
                    <th>id</th>
                    <th>name</th>
                    <th>avatar</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((item, index) => {
                    return (
                      <tr className="text-dark text-center" key={index}>
                        <td>{item.userId}</td>
                        <td>{item.name}</td>
                        <td>
                          <img className={style.avatar} src={item.avatar}></img>
                        </td>
                        <td>
                          <Button
                            type="default"
                            shape="circle"
                            icon={<CloseCircleFilled />}
                            onClick={() => handleRemoveUser(item.userId)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Antd_Button;
