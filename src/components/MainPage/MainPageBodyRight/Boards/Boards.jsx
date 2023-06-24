import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import {
  apigetProject,
  apiGetProjectDetail,
} from "./../../../../apis/projectAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { gettaskAPI } from "../../../../apis/TaskAPI";
import "./Boards.scss";
import { Container, Row, Col, Modal, Form, Pagination } from "react-bootstrap";
import { Button } from "antd";
// Lấy tên user từ phía client localstorage

function Boards() {
  const [dataproject, setdataproject] = useState([]);
  const [task, settask] = useState([]);
  console.log(dataproject);
  const getDataAllProject = async (value) => {
    try {
      const data = await apigetProject(value);
      setdataproject(data?.content);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataProjectDetail = async (id) => {
    try {
      const data = await apiGetProjectDetail(id);
    } catch (error) {
      console.log(error);
    }
  };
  function handleOnDragEnd(result) {
    const item = task[result.source.index];
    let newtask = task.filter((value, index) => {
      if (index != result.source.index) {
        return value;
      }
    });
    newtask.splice(result.destination.index, 0, item);
    console.log(newtask);
    settask(newtask);
  }
  useEffect(() => {
    getDataAllProject("TRELLO PROJECT");
  }, []);
  // antd modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="container-fluid characters">
        {/* <div className="row">
          {dataproject.length > 0 ? (
            dataproject.map((value, index) => {
              return (
                <CardMain
                  value={value}
                  index={index}
                  task={[{ id: 1 }, { id: 2 }]}
                />
              );
            })
          ) : (
            <img className={style.img} src="./img/nodatafound.jpg" />
          )}
        </div> */}
        <div className="main">
          <div className="header">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
                <li className="breadcrumb-item">Project</li>
                <li className="breadcrumb-item">CyberLearn</li>
                <li className="breadcrumb-item active" aria-current="page">
                  Cyber Board
                </li>
              </ol>
            </nav>
          </div>
          <h3>Cyber Board</h3>
          <div className="info" style={{ display: "flex" }}>
            <div className="search-block">
              <input className="search" />
              <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: "flex" }}>
              {dataproject.map((item) => {
                return item.members.map((data) => {
                  return (
                    <div className="avatar">
                      <img src={data.avatar} alt />
                    </div>
                  );
                });
              })}
            </div>
            <div style={{ marginLeft: 20 }} className="text">
              Only My Issues
            </div>
            <div style={{ marginLeft: 20 }} className="text">
              Recently Updated
            </div>
          </div>
          <div className="content" style={{ display: "flex" }}>
            <div className="card" style={{ width: "17rem", height: "25rem" }}>
              <div className="card-header">BACKLOG 3</div>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={showModal}
                >
                  <p>
                    Each issue has a single reporter but can have multiple
                    assignees
                  </p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <i className="fa fa-bookmark" />
                      <i className="fa fa-arrow-up" />
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar">
                          <img src="./assets/img/download (1).jfif" alt />
                        </div>
                        <div className="avatar">
                          <img src="./assets/img/download (2).jfif" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="list-group-item">
                  <p>
                    Each issue has a single reporter but can have multiple
                    assignees
                  </p>
                  <div className="block" style={{ display: "flex" }}>
                    <div className="block-left">
                      <i className="fa fa-check-square" />
                      <i className="fa fa-arrow-up" />
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: "flex" }}>
                        <div className="avatar">
                          <img src="./assets/img/download (1).jfif" alt />
                        </div>
                        <div className="avatar">
                          <img src="./assets/img/download (2).jfif" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div className="card" style={{ width: "17rem", height: "25rem" }}>
              <div className="card-header">SELECTED FOR DEVELOPMENT 2</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
              </ul>
            </div>
            <div className="card" style={{ width: "17rem", height: "25rem" }}>
              <div className="card-header">IN PROGRESS 2</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
              </ul>
            </div>
            <div className="card" style={{ width: "17rem", height: "25rem" }}>
              <div className="card-header">DONE 3</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
          <div>
            <Modal
              className="Modal-background"
              show={isModalOpen}
              size="lg"
              onHide={handleCancel}
            >
              <div className="modal-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-8">
                      <p className="issue">This is an issue of type: Task.</p>
                      <div className="description">
                        <p>Description</p>
                        <p>huy</p>
                      </div>
                      <div style={{ fontWeight: 500, marginBottom: 10 }}>
                        Jira Software (software projects) issue types:
                      </div>
                      <div className="title">
                        <div className="title-item">
                          <h3>
                            BUG <i className="fa fa-bug" />
                          </h3>
                          <p>
                            A bug is a problem which impairs or prevents the
                            function of a product.
                          </p>
                        </div>
                        <div className="title-item">
                          <h3>
                            STORY <i className="fa fa-book-reader" />
                          </h3>
                          <p>
                            A user story is the smallest unit of work that needs
                            to be done.
                          </p>
                        </div>
                        <div className="title-item">
                          <h3>
                            TASK <i className="fa fa-tasks" />
                          </h3>
                          <p>A task represents work that needs to be done</p>
                        </div>
                      </div>
                      <div className="comment">
                        <h6>Comment</h6>
                        <div
                          className="block-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img src="./assets/img/download (1).jfif" alt />
                          </div>
                          <div className="input-comment">
                            <input
                              type="text"
                              placeholder="Add a comment ..."
                            />
                            <p>
                              <span style={{ fontWeight: 500, color: "gray" }}>
                                Protip:
                              </span>
                              <span>
                                press
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    background: "#ecedf0",
                                    color: "#b4bac6",
                                  }}
                                >
                                  M
                                </span>
                                to comment
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="lastest-comment">
                          <div className="comment-item">
                            <div
                              className="display-comment"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img src="./assets/img/download (1).jfif" alt />
                              </div>
                              <div>
                                <p style={{ marginBottom: 5 }}>
                                  Lord Gaben <span>a month ago</span>
                                </p>
                                <p style={{ marginBottom: 5 }}>comment</p>
                                <div>
                                  <span style={{ color: "#929398" }}>Edit</span>
                                  •
                                  <span style={{ color: "#929398" }}>
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="status">
                        <h6>STATUS</h6>
                        <select className="custom-select">
                          <option selected>SELECTED FOR DEVELOPMENT</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                      </div>
                      <div className="assignees">
                        <h6>ASSIGNEES</h6>
                        <div style={{ display: "flex" }}>
                          <div style={{ display: "flex" }} className="item">
                            <div className="avatar">
                              <img src="./assets/img/download (1).jfif" alt />
                            </div>
                            <p className="name">
                              Pickle Rick
                              <i
                                className="fa fa-times"
                                style={{ marginLeft: 5 }}
                              />
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <i
                              className="fa fa-plus"
                              style={{ marginRight: 5 }}
                            />
                            <span>Add more</span>
                          </div>
                        </div>
                      </div>
                      <div className="reporter">
                        <h6>REPORTER</h6>
                        <div style={{ display: "flex" }} className="item">
                          <div className="avatar">
                            <img src="./assets/img/download (1).jfif" alt />
                          </div>
                          <p className="name">
                            Pickle Rick
                            <i
                              className="fa fa-times"
                              style={{ marginLeft: 5 }}
                            />
                          </p>
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
            </Modal>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Boards;
