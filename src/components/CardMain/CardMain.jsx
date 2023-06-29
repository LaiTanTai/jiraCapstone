import React, { useRef, useState, useEffect } from "react";
import { apiGetTaskDetail, apiRemoveTask } from "./../../apis/projectAPI";
import { apiUpdateTask } from "./../../apis/TaskAPI";
import {
  apiGetComment,
  apiInsertComment,
  apiUpdateComment,
  apiDeleteComment,
} from "./../../apis/commentAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import "./CardMain.scss";
import { Editor } from "@tinymce/tinymce-react";
import Avatar from "@mui/material/Avatar";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Select, Space, DatePicker, Slider, InputNumber } from "antd";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object({
  // listUserAsign: yup.string().required("Danh sách user không được để trống"),
  // taskName: yup.string().required("task name không được để trống"),
  // description: yup.string().required("mô tả không được để trống"),
  // statusId: yup.number().required("trạng thái không được để trống"),
  // originalEstimate: yup
  //   .number()
  //   .required("thời gian dự kiến không được để trống"),
  // projectId: yup.number().required("dự án không được để trống"),
  // typeId: yup.number().required("loại task không được để trống"),
  // priorityId: yup.number().required("ưu tiên không được để trống"),
});

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      height: "30px",
      width: "31px",
      marginRight: "10px",
    },
    children: `${name.charAt(0).toUpperCase()}`,
  };
}

function CardMain({ lstTaskDeTail, value, index }) {
  console.log("value", value);
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState(1);
  const [comment, setComment] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // declare initial value for inputs
    defaultValues: {
      taskId: 0,
      // listUserAsign: [],
      // taskName: "",
      description: "",
      statusId: 0,
      originalEstimate: 0,
      // timeTrackingSpent: 0,
      // timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value) => {
    try {
      const newSign = lstTaskDeTail.map((item) => {
        return item.assigness.map((item) => item.id);
      });

      const payload = {
        ...value,
        taskId: dataTaskDetail?.content.taskId,
        taskName: dataTaskDetail?.content.taskId,
        listUserAsign: newSign[0],
        timeTrackingSpent: +inputSpent.current.value,
        timeTrackingRemaining: +inputRemaining.current.value,
        projectId: lstTaskDeTail[0]?.projectId,
        typeId: +value.typeId,
        priorityId: +value.priorityId,
        originalEstimate: +value.originalEstimate,
      };
      const data = await apiUpdateTask(payload);
      if (data.statusCode === 200) {
        toast.success("Cập nhật task thành công");
      }
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };

  const getDataTaskDetail = async (taskId) => {
    try {
      const data = await apiGetTaskDetail(taskId);
      setDataTaskDetail(data);
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };

  const getComment = async () => {
    try {
      const data = await apiGetComment(dataTaskDetail?.content.taskId);
      const newData = data.content;
      setComment(newData);
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };
  const onChange = () => {
    let Spent = inputSpent.current.value;
    let Timing = inputRemaining.current.value;
    if (Spent !== undefined && Timing !== undefined) {
      let Sum = parseInt(Spent) + parseInt(Timing);
      setInputValue(Sum);
    } else if (Timing !== undefined) {
      setInputValue(Timing);
    } else if (Spent !== undefined) {
      setInputValue(Spent);
    }
  };
  const inputSpent = useRef();
  const inputRemaining = useRef();

  const removeTask = async (taskId) => {
    try {
      await apiRemoveTask(taskId);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };
  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    setName(nameLogin);
  }, []);

  const [show, setShow] = useState(false);
  const [editshow, setEditShow] = useState(false);
  const [dataTaskDetail, setDataTaskDetail] = useState();
  console.log(dataTaskDetail);
  const commentRef = useRef();

  const handleAddComment = async (taskId) => {
    const payload = {
      taskId: taskId,
      contentComment: commentRef.current.value,
    };
    await apiInsertComment(payload);
    await getComment();
  };

  const handleDeleteComment = async (id) => {
    try {
      await apiDeleteComment(id);
      await getComment();
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };

  const handleClose = () => setShow(false);
  const handleEditClose = () => setEditShow(false);
  const handleMouseEnter = (value) => {
    getDataTaskDetail(value);
  };
  const handleShow = () => {
    setShow(true);
    getComment();
  };
  const handleEditShow = () => {
    setEditShow(true);
    getComment();
  };
  const editorRef = useRef(null);
  const handleDescription = () => {
    if (editorRef.current) {
      setValue("description", editorRef.current.getContent());
    }
  };

  return (
    <>
      <Droppable droppableId={`drop ${index}`}>
        {(provided) => (
          <div
            className="container col-xl-3 col-lg-4 col-md-6 col-sm-12 box__card"
            {...provided.droppableProps}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <p className="card__times">{value.statusName}</p>
            <div className="drop_padding">
              {value.lstTaskDeTail.map((item, order) => {
                return (
                  <Draggable
                    key={item.taskId}
                    draggableId={`drag${item.taskId}`}
                    index={order}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="cards"
                        onClick={handleShow}
                        onMouseEnter={() => {
                          handleMouseEnter(item.taskId);
                        }}
                      >
                        <button
                          type="button"
                          className="cards_button"
                          onClick={handleEditShow}
                        >
                          Edit task
                        </button>
                        <h5> {item.taskName} </h5>
                        <div className="card-body">
                          {item.assigness.map((members) => {
                            return (
                              <Avatar {...stringAvatar(`${members.name}`)} />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          </div>
        )}
      </Droppable>
      <Modal show={show} size="xl" onHide={handleClose}>
        <Modal.Body>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <h3 className="issue">
                    This is an issue of type:{" "}
                    {dataTaskDetail?.content.taskTypeDetail.taskType}
                  </h3>
                  <div className="description">
                    <h3 style={{ display: "inline-block" }}>Description: </h3>
                    {parse(`${dataTaskDetail?.content.description}`)}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="input-comment">
                      <Form>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control
                              size="lg"
                              placeholder="Add a comment"
                              ref={commentRef}
                            />
                          </Form.Group>
                        </Row>
                      </Form>{" "}
                    </div>
                    <div className="mt-3">
                      <Button
                        onClick={() =>
                          handleAddComment(dataTaskDetail?.content.taskId)
                        }
                        size="lg"
                        type="primary"
                      >
                        Save
                      </Button>
                    </div>
                    <div className="lastest-comment mt-4">
                      {comment.map((item, index) => {
                        return (
                          <div className="comment-item mt-3" key={index}>
                            <div
                              className="display-comment"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img src={item.user.avatar} alt />
                              </div>
                              <div className="mx-3">
                                <p style={{ marginBottom: 5 }}>
                                  {item.contentComment}
                                </p>
                                <div>
                                  <span
                                    onClick={() => handleDeleteComment(item.id)}
                                    style={{
                                      color: "#929398",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select className="custom-select">
                      {dataTaskDetail?.content.statusId === "1" ? (
                        <option value={1}>BACKLOG</option>
                      ) : dataTaskDetail?.content.statusId === "2" ? (
                        <option value={2}>SELECTED FOR DEVELOPMENT</option>
                      ) : dataTaskDetail?.content.statusId === "3" ? (
                        <option value={3}>IN PROGRESS</option>
                      ) : dataTaskDetail?.content.statusId === "4" ? (
                        <option value={4}>DONE</option>
                      ) : (
                        <option value="">No Status</option>
                      )}
                    </select>
                  </div>
                  <div className="assignees mt-4">
                    <h6>ASSIGNEES</h6>
                    <div>
                      <div style={{ display: "flex" }} className="item">
                        {dataTaskDetail?.content?.assigness.map(
                          (item, index) => {
                            return (
                              <div className="avatar" key={index}>
                                <img src={item.avatar} />
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="priority" style={{ marginBottom: 20 }}>
                        <h6>PRIORITY</h6>
                        <select>
                          {dataTaskDetail?.content.priorityTask.priority ===
                          "Highest" ? (
                            <option>Highest</option>
                          ) : "Medium" ? (
                            <option>Medium</option>
                          ) : "Low" ? (
                            <option>Low</option>
                          ) : (
                            <option>Lowest</option>
                          )}
                        </select>
                      </div>
                      <div className="estimate">
                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                        <input
                          type="text"
                          value={dataTaskDetail?.content.originalEstimate}
                          className="estimate-hours"
                        />
                      </div>
                      <div className="time-tracking mt-4">
                        <h6>TIME TRACKING</h6>
                        <div style={{ display: "flex" }}>
                          <i className="fa fa-clock" />
                          <div style={{ width: "100%" }}>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={
                                  dataTaskDetail?.content
                                    .timeTrackingRemaining +
                                  dataTaskDetail?.content.timeTrackingSpent
                                }
                                aria-valuemin={0}
                                aria-valuemax={20}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="logged">
                                {dataTaskDetail?.content.timeTrackingRemaining}h
                                logged
                              </p>
                              <p className="estimate-time">
                                {dataTaskDetail?.content.timeTrackingSpent}h
                                estimated
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ color: "#929398" }}>
                        Create at a month ago
                      </div>
                      <div style={{ color: "#929398" }}>
                        Update at a few seconds ago
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeTask(dataTaskDetail?.content.taskId)
                        }
                      >
                        delete task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={editshow} size="xl" onHide={handleEditClose}>
        <Modal.Body>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Task Type</Form.Label>
                      <Form.Select {...register("typeId")}>
                        <option>Chọn Task Type</option>
                        <option value="1">Bug</option>
                        <option value="2">New Task</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label className="text-dark">Description</Form.Label>
                      <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
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
                </div>
                <div className="col-4">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Status</Form.Label>
                      <Form.Select {...register("statusId")}>
                        <option>Chọn trạng thái</option>
                        <option value="1">BACKLOG</option>
                        <option value="2">SELECTED FOR DEVELOPMENT</option>
                        <option value="3">IN PROGRESS</option>
                        <option value="4">DONE</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>

                  <div className="assignees mt-4">
                    <h6>ASSIGNEES</h6>
                    <div>
                      <div style={{ display: "flex" }} className="item">
                        {dataTaskDetail?.content?.assigness.map(
                          (item, index) => {
                            return (
                              <div className="avatar" key={index}>
                                <img src={item.avatar} />
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="priority" style={{ marginBottom: 20 }}>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select {...register("priorityId")}>
                              <option value="1">Highest</option>
                              <option value="2">Medium</option>
                              <option value="3">Low</option>
                              <option value="4">Lowest</option>
                            </Form.Select>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            controlId="formGridEmail"
                          ></Form.Group>
                        </Row>
                      </div>
                      <div className="estimate">
                        <Form.Label>Time tracking</Form.Label>
                        <Slider
                          min={1}
                          max={40}
                          value={inputValue !== undefined ? inputValue : 0}
                        />
                      </div>
                      <div className="time-tracking mt-4">
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Original Estimate</Form.Label>
                            <Form.Control
                              placeholder="Nhập thời gian dự kiến"
                              {...register("originalEstimate")}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Time Spent</Form.Label>
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
                            <Form.Label>Time Remaining</Form.Label>
                            <InputNumber
                              min={1}
                              max={20}
                              ref={inputRemaining}
                              onChange={onChange}
                              className="form-control"
                            />
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            controlId="formGridEmail"
                          ></Form.Group>
                        </Row>
                      </div>
                      <div style={{ color: "#929398" }}>
                        Create at a month ago
                      </div>
                      <div style={{ color: "#929398" }}>
                        Update at a few seconds ago
                      </div>
                      <button
                        type="button"
                        className="btn btn-success mt-3"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Update Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CardMain;
