import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import { apigetProject } from "./../../../../apis/projectAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// Lấy tên user từ phía client localstorage
function Boards() {
  const [dataproject, setdataproject] = useState([]);
  console.log(dataproject);
  useEffect(() => {
    apigetProject("Luong")
      .then((res) => {
        setdataproject(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
  <DragDropContext>
    <div className="container-fluid">
    
      <div className="row">
        {dataproject.length > 0 ? (
          dataproject.map((value, index) => {
            return(
              <Droppable droppableId={index}>
                {(provided)=>(
                <CardMain className="drag"  {...provided.droppableProps} {...provided.droppableProps} ref={provided.innerRef} value={value} index={index}/>
                )}
              </Droppable>  
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
