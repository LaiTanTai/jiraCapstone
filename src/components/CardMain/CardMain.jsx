import React, { useState, useEffect } from "react";
import  { gettaskAPI } from './../../apis/TaskAPI'
import { DragDropContext,Draggable,Droppable } from "react-beautiful-dnd";
import "./CardMain.scss";
import Avatar from "@mui/material/Avatar";

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

function CardMain({ value,index,task }) {
  const [name, setName] = useState("");
  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    console.log(gettaskAPI());
    setName(nameLogin);
  }, []);
  return (
    <Droppable droppableId={`drop ${index}`}>
        {(provided)=>(
        <div className="container box__card" {...provided.droppableProps} {...provided.droppableProps}   ref={provided.innerRef}>
          <p className="card__times">{value.projectName}</p>
            <div className="drop_padding">
              {task.map((item,order)=>{
                return(
                <Draggable key={item.id} draggableId={`drag${item.id}`} index={order}>
                {(provided)=>(
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="cards">
                    <h5> {value.categoryName } </h5>
                    <div className="card-body">
                      <Avatar {...stringAvatar(`${name}`)} />
                      <p className="card-title">{item.id}</p>
                    </div>
                  </div>
                  )}
                </Draggable>
                )
              })
              }
            </div>
          </div>
        )}
      </Droppable>      
  );
}

export default CardMain;
