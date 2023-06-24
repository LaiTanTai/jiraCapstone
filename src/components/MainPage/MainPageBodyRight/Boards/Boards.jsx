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
      </div>
    </DragDropContext>
  );
}

export default Boards;
