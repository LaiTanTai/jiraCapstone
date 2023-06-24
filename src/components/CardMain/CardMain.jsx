import React, { useState, useEffect } from "react";
import { gettaskAPI } from "./../../apis/TaskAPI";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./CardMain.scss";
import Avatar from "@mui/material/Avatar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

function CardMain({ value, index }) {
  const [name, setName] = useState("");

  const nameLogin = JSON.parse(localStorage.getItem("user"))?.name;
  useEffect(() => {
    setName(nameLogin);
  }, []);

  // // modal bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Droppable droppableId={`drop ${index}`}>
      {(provided) => (
        <div
          className="container box__card"
          {...provided.droppableProps}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <p className="card__times">{value.statusName}</p>
          <div className="drop_padding">
            {value.lstTaskDeTail.map((item, order) => {
              return (
                <Draggable
                  key={item.taskId}
                  draggableId={`drag${item.taskId}`}
                  index={order}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="cards"
                      onClick={handleShow}
                    >
                      <h5> {item.taskName} </h5>
                      <div className="card-body">
                        {item.assigness.map((members) => {
                          return (
                            <Avatar {...stringAvatar(`${members.name}`)} />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Droppable>
  );
}

export default CardMain;
