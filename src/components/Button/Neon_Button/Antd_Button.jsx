import React, { useRef, useState, useEffect } from "react";
import { Button, Space, Select } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import style from "./Antd_Button.module.scss";
import { apiremoveUser } from "../../../apis/projectAPI";
import { getAssignUserProject } from "../../../apis/TaskAPI";
import { apiGetUser } from "../../../apis/userAPI";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Pagination,
  Modal,
  Table,
} from "react-bootstrap";

function Antd_Button({ members, project }) {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState([]);
  const [user, setUser] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemoveUser = async (value) => {
    try {
      const payload = {
        userId: value,
        projectId: project,
      };
      const data = await apiremoveUser(payload);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const data = await apiGetUser();
      setUser(data.content);
    } catch (err) {
      console.log(err);
    }
  };
  const getIdUser = () => {
    // console.log(value);
    console.log("options", options);
    // setUserId(value);
  };
  useEffect(() => {
    getUser();
  }, []);
  let options = [];
  user?.map((item) => {
    options.push({
      label: item.name,
      value: item.userId,
    });
  });

  const handleAddUser = async () => {
    try {
      const payload = {
        userId: 5230,
        projectId: 12885,
      };
      const data = await getAssignUserProject(payload);
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
          <Dropdown.Item>
            <Button type="primary" onClick={handleShow} className={style.user}>
              Add user
            </Button>
            <Modal
              className="Modal-background"
              show={show}
              // onHide={handleClose}
            >
              <Modal.Header className="text-dark">
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className={style.label}>Chọn user</Form.Label>
                    <Space
                      style={{
                        width: "100%",
                      }}
                      direction="vertical"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Assigness"
                        options={options}
                        onChange={getIdUser}
                      />
                    </Space>
                  </Form.Group>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleClose}>X</button>
              </Modal.Footer>
            </Modal>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default Antd_Button;
