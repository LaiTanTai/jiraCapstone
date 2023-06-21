import React, { useRef, useState, useEffect } from "react";
import {
  apiDeleteUser,
  apiGetUser,
  apiSignup,
  apiUpdateUser,
  apiGetUserById,
} from "../../../../apis/userAPI";
import { useForm } from "react-hook-form";
import {
  apigetProject,
  apiremoveProject,
  apiupdateProject,
} from "../../../../apis/projectAPI";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import style from "./ProjectManagement.module.scss";
import Table from "react-bootstrap/Table";
import Antd_Button from "../../../Button/Neon_Button/Antd_Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";

const schema = yup.object({
  id: yup.number().required("id không được để trống"),
  projectName: yup.string().required("tên project không được để trống"),
  creator: yup.number().required("người tạo không được để trống"),
  description: yup.string().required("mô tả không được để trống"),
  categoryId: yup.string().required("loại không được để trống"),
});

function ProjectManagement() {
  const [listUser, setListProject] = useState([]);
  const [updateUser, setUpdatetUser] = useState({});
  const [foundUser, setFoundUser] = useState([]);
  const [showFix, setShowFix] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseFix = () => setShowFix(false);
  const handleChooseUser = (item) => {
    setShowFix(true);
    const clickedUser = listUser.find((user) => user.id === item.id);
    setUpdatetUser(clickedUser);
    getListProjects();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // declare initial value for inputs
    defaultValues: {
      id: 0,
      projectName: "",
      creator: 0,
      description: "",
      categoryId: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const [errorSignUp, setErrorSignUp] = useState("");
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await apiremoveProject(id);
    } catch (error) {
      console.log(error);
    }
    getListProjects();
  };

  const onUpdate = async (value) => {
    const Bear = JSON.parse(localStorage.getItem("user"))?.id;
    const idUser = updateUser.id;
    const payload = { ...value, id: idUser, creator: Bear };
    try {
      const data = await apiupdateProject(idUser, payload);
    } catch (error) {
      console.log(error);
    }
    getListProjects();
    setShowFix(false);
  };

  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);
    const searchUser = listUser.filter((user) => {
      const search = searchTerm.toLowerCase();
      let findUser = user.name.toLowerCase();
      return findUser.indexOf(search) !== -1;
    });
    clearTimeout(timeoutRef.current);
    setFoundUser(searchUser);
    getListProjects();
  };

  const getListProjects = async () => {
    try {
      const data = await apigetProject();
      if (searchTerm !== "") {
        setListProject(foundUser);
      } else {
        setListProject(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editorRef = useRef(null);
  const handleDescription = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setValue("description", editorRef.current.getContent());
      // console.log(props);
    }
  };

  useEffect(() => {
    getListProjects();
  }, [foundUser]);
  return (
    <div className={style.container}>
      <div>
        <h1 className="text-center text-dark">Quản lý dự án</h1>
      </div>
      <div>
        <input
          ref={inputRef}
          placeholder="Tìm kiếm"
          className={`${style.timkiem} mt-4`}
          value={searchTerm}
          onChange={handleSearch}
        ></input>
      </div>
      <div className="mt-4">
        <Table bordered hover>
          <thead>
            <tr className="text-dark text-center">
              <th>id</th>
              <th>Project Name</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Members</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listUser.map((item, index) => {
              return (
                <tr className="text-dark text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.projectName}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.creator?.name}</td>
                  <td>
                    {/* {item.members === [] ? (
                      <Antd_Button />
                    ) : (
                      item.members[0]?.name
                    )} */}
                    <Antd_Button project={item.id} members={item.members} />
                  </td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <div>
                        <Button
                          onClick={() => {
                            handleChooseUser(item);
                          }}
                        >
                          Sửa
                        </Button>
                      </div>
                      <div className={style.right}>
                        <Button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <Modal
            className="Modal-background"
            size="lg"
            show={showFix}
            onHide={handleCloseFix}
          >
            <Modal.Header className="text-dark">
              <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className={style.label}>Project id</Form.Label>
                    <Form.Control
                      placeholder="id"
                      value={updateUser.id}
                      {...register("id")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className={style.label}>
                      Project Name
                    </Form.Label>
                    <Form.Control
                      placeholder={updateUser.projectName}
                      {...register("projectName")}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className={style.label}>
                      Project Category
                    </Form.Label>
                    <Form.Select {...register("categoryId")}>
                      <option>Chọn dự án</option>
                      <option value="1">Dự án web</option>
                      <option value="2">Dự án phần mềm</option>
                      <option value="3">Dự án di động</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className="text-dark">Description</Form.Label>
                    {/* <Form.Control
                as="textarea"
                placeholder="Description"
                {...register("description")}
              /> */}
                    <Editor
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue=""
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      placeholder="Description"
                      onEditorChange={handleDescription}
                      {...register("description")}
                    />
                  </Form.Group>
                </Row>
              </Form>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit(onUpdate)} type="submit">
                Cập nhật
              </Button>
              <Button onClick={handleCloseFix}>Đóng</Button>
            </Modal.Footer>
          </Modal>
        </Table>
      </div>

      <Pagination>
        <Pagination.Ellipsis />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Ellipsis />
      </Pagination>
    </div>
  );
}

export default ProjectManagement;
