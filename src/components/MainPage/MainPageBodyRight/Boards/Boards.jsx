import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import { apigetProject } from "./../../../../apis/projectAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { gettaskAPI } from "../../../../apis/TaskAPI";
// Lấy tên user từ phía client localstorage

function Boards() {
  const [dataproject, setdataproject] = useState([]);
  const [task,settask] = useState([])
  console.log(dataproject);
  useEffect(() => {
    apigetProject("trello project")
      .then((res) => {
        setdataproject(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);
  function handleOnDragEnd(result){
    const item = task[result.source.index]
    let newtask = task.filter((value,index)=>{
      if(index!=result.source.index){
        return value;
      }
    });
    newtask.splice(result.destination.index,0,item)
    console.log(newtask)
    settask(newtask);
  }
  return (
  <DragDropContext onDragEnd={handleOnDragEnd}>
  
    <div className="container-fluid characters">
    
      <div className="row">
        {dataproject.length > 0 ? (
          dataproject.map((value, index) => {
            
            return(
                    <CardMain  value={value} index={index} task={[{id:1},{id:2}]}/>
                )}
            ) 
          ) : (
          <img className={style.img} src="./img/nodatafound.jpg"/>
        )}
      </div>
    </div>
    </DragDropContext>  
  );
}

export default Boards;
