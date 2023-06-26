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
  // console.log(dataproject);
  // const getDataAllProject = async (value) => {
  //   try {
  //     const data = await apigetProject(value);
  //     setdataproject(data?.content);
  //   } catch (error) {
  //     console.log(error);
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

  const getDetail = async () => {
    try {
      const data = await apigetProjectDetail(12863);
      setdataproject(data?.content.lstTask);
      setmembers(data?.content.members);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      <div>
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
