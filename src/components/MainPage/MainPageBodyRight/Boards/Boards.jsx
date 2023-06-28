import React, { useEffect, useState, useRef } from "react";
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
import { Container, Row, Col, Form, Pagination } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "react-hook-form";
// Lấy tên user từ phía client localstorage

function Boards() {
  const [dataproject, setdataproject] = useState([]);
  const [members, setmembers] = useState([]);
  const [selectedProject, setSelectProject] = useState([]);
  // console.log(dataproject);
  // const getDataAllProject = async (value) => {
  //   try {
  //     const data = await apigetProject(value);
  //     setdataproject(data?.content);
  //   } catch (error) {
  //     toast.error(error.response.data.content);
  //   }
  // };
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    let newdataProject = dataproject;
    console.log(result);
    const indexdropsource = result.source.droppableId.slice(4);
    const item =
      newdataProject[Number.parseInt(indexdropsource, 10)].lstTaskDeTail[
        result.source.index
      ];
    console.log(item);
    let sourcelist = newdataProject[
      Number.parseInt(indexdropsource)
    ].lstTaskDeTail.filter((value, index) => {
      if (index != result.source.index) {
        return value;
      }
    });
    newdataProject[Number.parseInt(indexdropsource)].lstTaskDeTail = sourcelist;
    const indexdropdestination = result.destination.droppableId.slice(4);
    newdataProject[Number.parseInt(indexdropdestination)].lstTaskDeTail.splice(
      result.destination.index,
      0,
      item
    );
    setdataproject(newdataProject);
  }
  const projectRef = useRef();
  const getDetail = async () => {
    try {
      let id = projectRef.current.value;
      const data = await apigetProjectDetail(id);
      setdataproject(data?.content.lstTask);
      setmembers(data?.content.members);
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };

  const getProject = async () => {
    try {
      const value = "";
      const data = await apigetProject(value);
      const id = JSON.parse(localStorage.getItem("user"))?.id;
      console.log("id", id);
      const newData = data?.content.filter((item) => {
        return item.creator.id === id;
      });
      setSelectProject(newData);
      getDetail();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
    getProject();
  }, []);
  return (
    <>
      <div>
        <ToastContainer />
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
        <div>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark">Chọn dự án</Form.Label>
              <Form.Select ref={projectRef} onChange={getProject}>
                <option>Chọn dự án</option>
                {selectedProject.map((item) => {
                  return <option value={item.id}>{item.projectName}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail"></Form.Group>
          </Row>
        </div>
        <div className="info" style={{ display: "flex" }}>
          <div className="search-block">
            <input className="search" />
            <i className="fa fa-search" />
          </div>
          <div className="avatar-group" style={{ display: "flex" }}>
            {members.map((ava) => {
              return (
                <div className="avatar">
                  <img src={ava.avatar} alt />
                </div>
              );
            })}
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Only My Issues
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Recently Updated
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="container-fluid characters">
          <div className="row">
            {dataproject.length > 0 ? (
              dataproject.map((value, index) => {
                return (
                  <CardMain
                    lstTaskDeTail={value.lstTaskDeTail}
                    value={value}
                    index={index}
                  />
                );
              })
            ) : (
              <img className={style.img} src="./img/nodatafound.jpg" />
            )}
          </div>
        </div>
      </DragDropContext>
    </>
  );
}

export default Boards;
