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
const task = [{
  id:1,
  des:"first"
},
{
  id:2,
  des:"Second"
},
{
  id:3,
  des:"third"
},
{
  id:4,
  des:"fourth"
},
{
  id:5,
  des:"firth"
},
{
  id:6,
  des:"first"
}
]
function CardMain({ value,index }) {
  const [name, setName] = useState("");
  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    gettaskAPI();
    setName(nameLogin);
  }, []);
  return (
    <Droppable droppableId={`drop ${index}`}>
        {(provided)=>(
        <div className="container box__card" {...provided.droppableProps} {...provided.droppableProps}   ref={provided.innerRef}>
          <p className="card__times">{value.projectName}</p>
              {task.map((item,order)=>{
                return(
                <Draggable key={item.id} draggableId={`drag${item.id}`} index={order}>
                {(provided)=>(
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}  className="card my-3">
                    <h5> {value.categoryName} </h5>
                    <div className="card-body">
                      <Avatar {...stringAvatar(`${name}`)} />
                      <p className="card-title">{value.description}</p>
                    </div>
                  </div>
                  )}
                </Draggable>
                )
              })
              }
          </div>
        )}
      </Droppable>      
  );
}

export default CardMain;
