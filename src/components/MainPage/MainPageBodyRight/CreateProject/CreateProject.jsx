import React, { useRef, useState, useEffect } from "react";
import { apiCreateProject } from "../../../../apis/projectAPI";
import { Container, Row, Col, Modal, Form, Pagination } from "react-bootstrap";
import style from "./CreateProject.module.scss";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
// import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function CreateProject() {
  return <div>CreateProject</div>;
}

export default CreateProject;
