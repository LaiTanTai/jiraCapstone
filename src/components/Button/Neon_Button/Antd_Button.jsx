import React, { useRef, useState, useEffect } from "react";
import { Button, Space, Select } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import style from "./Antd_Button.module.scss";
import { apiremoveUser, apigetProject } from "../../../apis/projectAPI";
import { getAssignUserProject } from "../../../apis/TaskAPI";
import { apiGetUser, apiGetUserById } from "../../../apis/userAPI";
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

function Antd_Button({ setList, project }) {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState([]);
  const [members, setMembers] = useState([]);
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
      getUserId(project);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const data = await apiGetUser();
      setUser(data.content);
      getUserId(project);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserId = async (project) => {
    try {
      const data = await apiGetUserById(project);
      setMembers(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    getUserId(project);
  }, [user]);
  const getIdUser = async (value) => {
    console.log("value1", value);
    for (let i = 0; i < value.length; i++) {
      let id = value[i];
      console.log("id", id);
      await handleAddUser(id)
        .then((response) => {
          if (response?.statusCode === 200) {
            console.log("add user thành công");
          } else {
            console.log("fail");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const data = await apigetProject();
    setList(data.content);
  };

  const handleAddUser = async (id) => {
    try {
      const payload = {
        userId: id,
        projectId: project,
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
              style={{ zIndex: "1050" }}
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
                    {/* <Form.Select aria-label="Default select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select> */}
                    <Space
                      style={{
                        width: "100%",
                        zIndex: "1000000000000000",
                      }}
                      direction="vertical"
                    >
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%", zIndex: "100000000000" }}
                        placeholder="Please select"
                        onChange={getIdUser}
                        options={user?.map((item) => {
                          return {
                            label: item.name,
                            value: item.userId,
                          };
                        })}
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
