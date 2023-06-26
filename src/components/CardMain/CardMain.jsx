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
import Antd_Button from "../Button/Neon_Button/Antd_Button";
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

  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    setName(nameLogin);
    getComment();
  }, []);

  // // modal bootstrap
  const [show, setShow] = useState(false);
  // const [listUser, setListProject] = useState([]);
  const [dataTaskDetail, setDataTaskDetail] = useState();
  console.log(dataTaskDetail);
  const commentRef = useRef();
  const handleAddComment = async () => {
    const payload = {
      taskId: 10156,
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

  // const getListProjects = async () => {
  //   try {
  //     const data = await apigetProject();
  //     setListProject(data.content);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getComment = async () => {
    try {
      const data = await apiGetComment(10156);
      const newData = data.content;
      setComment(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (value) => {
    setShow(true);
    getDataTaskDetail(value);
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
                        onClick={() => handleShow(item.taskId)}
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
                        onClick={handleAddComment}
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
                                <img
                                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACIAIgMBEQACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAEBQYHAwL/xAAxEAACAQIEAwYDCQAAAAAAAAABAgMEEQASITEFIkEGE0JRcZEUYdEjMjNDcoGCsfD/xAAaAQADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QALxEAAQIEAwYFBAMAAAAAAAAAAQACAxEhMQQSUSJBYXGh8BMykbHRBVKB4YLC8f/aAAwDAQACEQMRAD8An+3zZeNpHTSKe7BZHV75s+uh23zC31tiZhtpgcb9hWw7YkRT4/1LKQyCKKppY7FmySIRy3Olv0m5Hy9saewgZgqGHjw3vdCiOsKHrPmKdzTSLL3j0tDzQzrdZZLHmXa+lhvb+V/LAQJUG9PveXNEWPRzdwmKG9jM6/iWqBd6lGgeGYzTMxVYQxOckAADodW6bYJDBIkUlj/DzTa3LastJnn63V0U43Ic8AHdNqmvh6YKY0jJeYyg1KzatijGdbOGtyjSyG+txby/vGWGk5K/iaxMrXB09/TjK/Sap+xU3Cajh1Xw3iTBJA5eCcrzANa4t1BsLj0O4BHXvIqKhTIkJ8N4cKfIQz0ZhkNLHKkkTNnyK4V3IF8yk6XAubG2l998Ca0P8voqY+oOJzRRtWB3cQRevDhZdyKHh/EI5KlY7xp3gRQwIUgsSL9QGK6ag62FhcjWkAlt0riY8R+wTQ8qykN2sv3VaRR9t+yC0kCtVgERqCGp3vt1sMYJbqlz9Nxf2FYdVydzMJAt0DG4PivgkECqofUC/ZLjW3pdcIpHLK8bqCpsSQAP301GO7TSuHwojZumdRWfMJzRV8UKsXVQGFyY7gC24seYHyN97WHXGXOJoF9Cw7WDOakWHsdJajS53JZxziTVnIkZjMrkAE3IBN/LYa+5wSC0Nm4oOOe6KWw23Mh3U8E2i4NP3aXrKReUaOxBHry74AROswqQisYMpY6Y0t7pXWR5lJb79rC/VT/tPX0xphIKDHY1zTIU38/zfj+ygEARtGAPKBfB5TFVNDnQ3Zm9F0+PDQBWhfODq6tuOmOeFKxRRjM3nbbh6m/z1XvhotWfGSxB0h8Lagm9tfW/tfGYhkzKETCAPj+I6mnDiO+asBHwmUCR5iGfmIZSSCfnhAhpM5r0jX42GAxrAQKXU42sKnrnOvthkVJ73hS4my1svt/q5BVwAn0H5n1wy2yiupEkgqX8KQ+W2CuugQ6tHNM+HE/AV4ubGNCR5/aLhd+9UYHmhfy9lWUVPA1FTs0MZJjUklRrphbKNFWfGiBxAcfVf//Z"
                                  alt
                                />
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
                      <option selected>SELECTED FOR DEVELOPMENT</option>
                      <option value={1}>BACKLOG</option>
                      <option value={2}>IN PROGRESS</option>
                      <option value={3}>DONE</option>
                    </select>
                  </div>
                  <div className="assignees mt-4">
                    <h6>ASSIGNEES</h6>
                    <div>
                      <div style={{ display: "flex" }} className="item">
                        <div className="avatar">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACIAIgMBEQACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAEBQYHAwL/xAAxEAACAQIEAwYDCQAAAAAAAAABAgMEEQASITEFIkEGE0JRcZEUYdEjMjNDcoGCsfD/xAAaAQADAQEBAQAAAAAAAAAAAAADBAUCAQYA/8QALxEAAQIEAwYFBAMAAAAAAAAAAQACAxEhMQQSUSJBYXGh8BMykbHRBVKB4YLC8f/aAAwDAQACEQMRAD8An+3zZeNpHTSKe7BZHV75s+uh23zC31tiZhtpgcb9hWw7YkRT4/1LKQyCKKppY7FmySIRy3Olv0m5Hy9saewgZgqGHjw3vdCiOsKHrPmKdzTSLL3j0tDzQzrdZZLHmXa+lhvb+V/LAQJUG9PveXNEWPRzdwmKG9jM6/iWqBd6lGgeGYzTMxVYQxOckAADodW6bYJDBIkUlj/DzTa3LastJnn63V0U43Ic8AHdNqmvh6YKY0jJeYyg1KzatijGdbOGtyjSyG+txby/vGWGk5K/iaxMrXB09/TjK/Sap+xU3Cajh1Xw3iTBJA5eCcrzANa4t1BsLj0O4BHXvIqKhTIkJ8N4cKfIQz0ZhkNLHKkkTNnyK4V3IF8yk6XAubG2l998Ca0P8voqY+oOJzRRtWB3cQRevDhZdyKHh/EI5KlY7xp3gRQwIUgsSL9QGK6ag62FhcjWkAlt0riY8R+wTQ8qykN2sv3VaRR9t+yC0kCtVgERqCGp3vt1sMYJbqlz9Nxf2FYdVydzMJAt0DG4PivgkECqofUC/ZLjW3pdcIpHLK8bqCpsSQAP301GO7TSuHwojZumdRWfMJzRV8UKsXVQGFyY7gC24seYHyN97WHXGXOJoF9Cw7WDOakWHsdJajS53JZxziTVnIkZjMrkAE3IBN/LYa+5wSC0Nm4oOOe6KWw23Mh3U8E2i4NP3aXrKReUaOxBHry74AROswqQisYMpY6Y0t7pXWR5lJb79rC/VT/tPX0xphIKDHY1zTIU38/zfj+ygEARtGAPKBfB5TFVNDnQ3Zm9F0+PDQBWhfODq6tuOmOeFKxRRjM3nbbh6m/z1XvhotWfGSxB0h8Lagm9tfW/tfGYhkzKETCAPj+I6mnDiO+asBHwmUCR5iGfmIZSSCfnhAhpM5r0jX42GAxrAQKXU42sKnrnOvthkVJ73hS4my1svt/q5BVwAn0H5n1wy2yiupEkgqX8KQ+W2CuugQ6tHNM+HE/AV4ubGNCR5/aLhd+9UYHmhfy9lWUVPA1FTs0MZJjUklRrphbKNFWfGiBxAcfVf//Z"
                            alt
                          />
                        </div>
                        <div className="avatar">
                          <img
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIACIAIgMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAABgQFBwED/8QAMBAAAgEDAwEFBQkAAAAAAAAAAQIDAAQRBRIhMQYTQVFxBxQygZEiIzNCYcHR4fD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAYEQEAAwEAAAAAAAAAAAAAAAAAARFBMf/aAAwDAQACEQMRAD8A0zUjiFnZ441B5ZyAoXxz/vGsl9o3anQbnSZtPgupbm6LDu5bdSY15BOXOMg4HTNQvbBf3V5q1lGu42MFtuUHOwysXyfXCj5UnadGvvwh1C3lVAGaZCrBkXAJOBzwOaUXRq7E9pdItpJba5eWN5kXEjuXRTjnJzxnFXmuKs1v7xEQ8ZGVZQcEVmM0FtGouLWOVYnYhWYcKc/CTjG7HOP1q00Ce7TWYIBHPsmZRKmw8xnGGIPhhsg9OhpEEzaed2TxRV22nxgkZ8a7UatRdvffX1mOyZ8nuoykeOMkkep6/wBUs2VwZdRkM0zy7yQZgcF1xjofMfSnX2oWcuj65Y6gsuHkiCxnPIeNsgj03CknUb03+rtcLaW9oZCPuYFKoOOoHh41WVlcwIkVvaqT3Uj96EZh8R+zuAyD0x59KnQ6df6X2rt7O+mDSr3JEwHG04ABHkCMef2frQ3txPb3UIfaXRdykEkc0w6LqUuu9obW51SWJJVw3A2hgmWUY9f3qLhumnCzOCVBDEY3GiutZ6I7F5b9t7HLdOvjRQHtfUPoIZwGZLlNpPJXOc4rI7v8RPnRRTTHm35fX+KvNGAE8jAYYRYB8RyKKKs9I4ml3z8TfWiiioP/2Q=="
                            alt
                          />
                        </div>
                      </div>
                      <div className="priority" style={{ marginBottom: 20 }}>
                        <h6>PRIORITY</h6>
                        <select>
                          <option>Highest</option>
                          <option>Medium</option>
                          <option>Low</option>
                          <option>Lowest</option>
                        </select>
                      </div>
                      <div className="estimate">
                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                        <input type="text" className="estimate-hours" />
                      </div>
                      <div className="time-tracking">
                        <h6>TIME TRACKING</h6>
                        <div style={{ display: "flex" }}>
                          <i className="fa fa-clock" />
                          <div style={{ width: "100%" }}>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="logged">4h logged</p>
                              <p className="estimate-time">12h estimated</p>
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
