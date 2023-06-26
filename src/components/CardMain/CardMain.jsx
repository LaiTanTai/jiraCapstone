import React, { useRef, useState, useEffect } from "react";
import { gettaskAPI } from "./../../apis/TaskAPI";
import {
  apigetProject,
  apiremoveProject,
  apiupdateProject,
  apiGetTaskDetail,
} from "./../../apis/projectAPI";
import {
  apiGetComment,
  apiInsertComment,
  apiUpdateComment,
  apiDeleteComment,
} from "./../../apis/commentAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./CardMain.scss";
import Avatar from "@mui/material/Avatar";
import { Button, Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";

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

function CardMain({ value, index }) {
  const [name, setName] = useState("");

  const [comment, setComment] = useState([]);

  const getComment = async () => {
    try {
      const data = await apiGetComment(dataTaskDetail?.content.taskId);
      const newData = data.content;
      setComment(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    setName(nameLogin);
  }, []);

  const [show, setShow] = useState(false);
  const [dataTaskDetail, setDataTaskDetail] = useState();
  const commentRef = useRef();

  const handleAddComment = async (taskId) => {
    console.log(taskId);
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
      console.log(error);
    }
  };

  const getDataTaskDetail = async (taskId) => {
    try {
      const data = await apiGetTaskDetail(taskId);
      setDataTaskDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleMouseEnter = (value) => {
    getDataTaskDetail(value);
  };
  const handleShow = () => {
    setShow(true);
    getComment();
  };
  return (
    <>
      <Droppable droppableId={`drop ${index}`}>
        {(provided) => (
          <div
            className="container box__card"
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
                      ) : "2" ? (
                        <option value={2}>SELECTED FOR DEVELOPMENT</option>
                      ) : "3" ? (
                        <option value={2}>IN PROGRESS</option>
                      ) : "4" ? (
                        <option value={2}>DONE</option>
                      ) : (
                        ""
                      )}
                    </select>
                  </div>
                  <div className="assignees mt-4">
                    <h6>ASSIGNEES</h6>
                    <div>
                      <div style={{ display: "flex" }} className="item">
                        {dataTaskDetail?.content?.assigness?.map(
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
