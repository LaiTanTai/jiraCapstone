import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import {
  apigetProject,
  apigetProjectDetail,
} from "./../../../../apis/projectAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { gettaskAPI } from "../../../../apis/TaskAPI";
import "./Boards.scss";
import { Button, Modal } from "antd";
// Lấy tên user từ phía client localstorage

function Boards() {
  const [dataproject, setdataproject] = useState([]);
  const [members, setmembers] = useState([]);
  const [task, settask] = useState([]);
  console.log(dataproject);
  // const getDataAllProject = async (value) => {
  //   try {
  //     const data = await apigetProject(value);
  //     setdataproject(data?.content);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
    apigetProjectDetail(12863)
      .then((res) => {
        setdataproject(res.content.lstTask);
        console.log(res.content.lstTask);
        setmembers(res.content.members);
        console.log(res.content.members);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="container-fluid characters">
        <div className="row">
          {dataproject.length > 0 ? (
            dataproject.map((value, index) => {
              return <CardMain value={value} index={index} />;
            })
          ) : (
            <img className={style.img} src="./img/nodatafound.jpg" />
          )}
        </div>
        {/* <div className="main">
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
              <div className="avatar">
                <img src="./assets/img/download (1).jfif" alt />
              </div>
              <div className="avatar">
                <img src="./assets/img/download (2).jfif" alt />
              </div>
              <div className="avatar">
                <img src="./assets/img/download (3).jfif" alt />
              </div>
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
                <Modal
                  className="modal fade"
                  id="infoModal"
                  // tabIndex={-1}
                  // role="dialog"
                  // aria-labelledby="infoModal"
                  // aria-hidden="true"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  {/* <div className="modal-dialog modal-info">
            <div className="modal-content">
              <div className="modal-header">huy</div>
            </div>
          </div> */}
        {/*<p>Huy</p>
                </Modal>
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
        </div> */}
      </div>
    </DragDropContext>
  );
}

export default Boards;
