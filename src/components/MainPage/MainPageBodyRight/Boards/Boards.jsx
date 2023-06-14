import React, { useEffect, useState } from "react";
import style from "./Boards.module.scss";
import CardMain from "../../../CardMain/CardMain";
import { apigetProject } from "./../../../../apis/projectAPI";
import Loader from "../../../Loader/Loader";
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
    <div className="container-fluid">
      <div className="row">
        {dataproject.length > 0 ? (
          dataproject.map((value, index) => {
            console.log(value);
            return <CardMain value={value} />;
          })
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Boards;
