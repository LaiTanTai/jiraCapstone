import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import { apigetProject } from "./../../../../apis/projectAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// Lấy tên user từ phía client localstorage
const tasks = [{
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
function Boards() {
  const [dataproject, setdataproject] = useState([]);
  const [task,settask] = useState(tasks)
  console.log(dataproject);
  useEffect(() => {
    apigetProject("Tyalia")
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
  
    <div className="container-fluid characters" style={{marginLeft:"50px"}} >
    
      <div className="row">
        {dataproject.length > 0 ? (
          dataproject.map((value, index) => {
            
            return(
                    <CardMain  value={value} index={index} task={task}/>
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
