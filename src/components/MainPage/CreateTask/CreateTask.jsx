<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useRef, useEffect } from "react";
>>>>>>> Luong
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./CreateTask.module.scss";
import { apigetProject } from "../../../apis/projectAPI";
import { apiGetUserById } from "../../../apis/userAPI";
import {
  getPriority,
  getStatus,
  getTaskType,
  getAssignUserTask,
} from "../../../apis/TaskAPI";
import Alert from "@mui/material/Alert";
<<<<<<< HEAD
=======
import { Editor } from "@tinymce/tinymce-react";
import Item from "antd/es/list/Item";

>>>>>>> Luong
const schema = yup.object({
  email: yup.string().email().required("email không được để trống"),
  passWord: yup.string().required("Mật khẩu không được để trống"),
  name: yup.string().required("Tên không được để trống"),
  phoneNumber: yup.number().required("Số điện thoại không được để trống"),
});

function CreateTask() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [tasktype, setTaskType] = useState([]);
  const [user, setUser] = useState([]);
  const [payload, setPayload] = useState("");

  const inputRef = useRef();
  const inputUser = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // declare initial value for inputs
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const getListProject = async () => {
    try {
      const name = "";
      const data = await apigetProject(name);
      const newData = data.content;
      //   const newListSystem = newData.map((item) => {
      //     return item.projectName;
      //   });

      setProjectName(newData);
      const Ref = inputRef.current.value;
      setPayload(Ref);
      getListUser();
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
=======
  const getListStatus = async () => {
    try {
      const data = await getStatus();
      const newData = data.content;
      //   const newListSystem = newData.map((item) => {
      //     return item.projectName;
      //   });

      setStatus(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getListPriority = async () => {
    try {
      const data = await getPriority();
      const newData = data.content;
      setPriority(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getListTaskType = async () => {
    try {
      const data = await getTaskType();
      const newData = data.content;
      setTaskType(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getListUser = async () => {
    try {
      if (payload !== "") {
        const data = await apiGetUserById(payload);
        const newData = data.content;
        setUser(newData);
      }
      console.log("payload", payload);
    } catch (error) {
      console.log(error);
    }
  };

  const addUserIntoTask = async (value) => {
    try {
      const data = await getAssignUserTask(value);
      const newData = data.content;
      console.log("newData", newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListProject();
    getListStatus();
    getListPriority();
    getListTaskType();
  }, []);

  const [errorSignUp, setErrorSignUp] = useState("");
  const onSubmit = async (value) => {
    console.log("value", value);
    try {
      //   await apiSignup(value);
      navigate("/login");
    } catch (error) {
      setErrorSignUp(error);
      console.log(error);
    }
  };

>>>>>>> Luong
  return (
    <div className={`${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Create Task</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Project</Form.Label>
              <Form.Select
                // {...register("categoryId")}
                ref={inputRef}
                onChange={getListProject}
              >
                <option value="">Chọn dự án</option>
                {projectName.map((item) => {
                  return <option value={item.id}>{item.projectName}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Task Name</Form.Label>
              <Form.Control
                placeholder="Task Name"
                // {...register("passWord")}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Status</Form.Label>
              <Form.Select onChange={getListStatus}>
                <option>Chọn trạng thái</option>
                {status.map((item) => {
                  return (
                    <option value={item.statusName}>{item.statusName}</option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
<<<<<<< HEAD
              <Form.Label className={styles.label}>Số Điện Thoại</Form.Label>
              <Form.Control
                type="phone"
                placeholder="phone"
                {...register("phoneNumber")}
              />
=======
              <Form.Label className={styles.label}>Priority</Form.Label>
              <Form.Select onChange={getListStatus}>
                <option>Chọn priority</option>
                {priority.map((item) => {
                  return <option value={item.priority}>{item.priority}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Task Type</Form.Label>
              <Form.Select onChange={getListStatus}>
                <option>Chọn Task Type</option>
                {tasktype.map((item) => {
                  return <option value={item.taskType}>{item.taskType}</option>;
                })}
              </Form.Select>
>>>>>>> Luong
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Assigness</Form.Label>
              <Form.Select ref={inputUser} onChange={getListUser}>
                <option>Chọn Assigness</option>
                {user.map((item) => {
                  return <option value={item.UserId}>{item.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Task Type</Form.Label>
              <Form.Select onChange={getListStatus}>
                <option>Chọn Task Type</option>
                {tasktype.map((item) => {
                  return <option value={item.taskType}>{item.taskType}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Row>

          {errorSignUp && (
            <Alert className="mb-3" severity="error">
              Tài khoản đã được tồn tại !!
            </Alert>
          )}
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            className="btn-lg"
            type="submit"
          >
            Submit
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
}

export default CreateTask;
