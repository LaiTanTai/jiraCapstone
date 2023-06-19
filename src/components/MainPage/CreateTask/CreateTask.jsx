import React, { useState, useRef, useEffect } from "react";

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
import { Select, Space, DatePicker, Slider, InputNumber } from "antd";
import { Editor } from "@tinymce/tinymce-react";

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
  const [inputValue, setInputValue] = useState(1);
  const [spent, setSpent] = useState(0);
  const [timing, setTiming] = useState(0);

  const onChange = () => {
    let Spent = inputSpent.current.value;
    let Timing = inputRemaining.current.value;
    if (Spent !== undefined && Timing !== undefined) {
      let Sum = parseInt(Spent) + parseInt(Timing);
      console.log("Sum", Sum);
      setInputValue(Sum);
    } else if (Timing !== undefined) {
      setInputValue(Timing);
    } else if (Spent !== undefined) {
      setInputValue(Spent);
    }
  };

  const inputRef = useRef();
  const inputUser = useRef();
  const inputSpent = useRef();
  const inputRemaining = useRef();

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
  console.log(payload);
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

  // select antd
  const options = [];

  user.map((item) => {
    options.push({
      label: item.name,
      value: item.name,
    });
  });

  // date-picker
  // time tricking
  const onChangeTimeTricking = (value, dateString) => {
    console.log("Selected Time Tricking: ", value?.$M);
    console.log("Formatted Selected Time Tricking: ", dateString);
  };
  const onOkTimeTricking = (value) => {
    console.log("onOk: ", value);
  };
  // time spents
  const onChangeTimeSpent = (value, dateString) => {
    console.log("Selected Time Spent: ", value);
    console.log("Formatted Selected Time Tricking: ", dateString);
  };
  const onOkTimeSpent = (value) => {
    console.log("onOk: ", value);
  };
  // time remaining
  const onChangeTimeRemaining = (value, dateString) => {
    console.log("Selected Time Remaining: ", value);
    console.log("Formatted Selected Time Tricking: ", dateString);
  };
  const onOkTimeRemaining = (value) => {
    console.log("onOk: ", value);
  };
  // origin estimate
  const onChangeOriginEstimate = (value, dateString) => {
    console.log("Selected Time Remaining: ", value);
    console.log("Formatted Selected Time Tricking: ", dateString);
  };
  const onOkTimeOriginEstimate = (value) => {
    console.log("onOk: ", value);
  };
  //editor

  const editorRef = useRef(null);
  const handleDescription = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Assigness</Form.Label>
              <Form.Select onChange={getListStatus}>
                <option>Chọn Task Type</option>
                {user.map((item) => {
                  return <option value={item.name}>{item.name}</option>;
                })}
              </Form.Select>
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
                  placeholder="chon Assigness"
                  onChange={getListUser}
                  options={options}
                />
              </Space>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Time tracking</Form.Label>
              <Slider
                min={1}
                max={40}
                value={inputValue !== undefined ? inputValue : 0}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>
                Original Estimate
              </Form.Label>
              <DatePicker
                showTime
                placeholder="origin estimate"
                onChange={onChangeOriginEstimate}
                onOk={onOkTimeOriginEstimate}
                className="form-control"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Time Spent</Form.Label>
              <InputNumber
                min={1}
                max={20}
                ref={inputSpent}
                onChange={onChange}
                className="form-control"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Time Remaining</Form.Label>
              <InputNumber
                min={1}
                max={20}
                ref={inputRemaining}
                onChange={onChange}
                className="form-control"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail"></Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark">Description</Form.Label>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                placeholder="Description"
                onEditorChange={handleDescription}
                {...register("description")}
              />
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
