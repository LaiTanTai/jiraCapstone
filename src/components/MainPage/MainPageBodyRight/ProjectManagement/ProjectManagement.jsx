import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { apiGetUserById } from "../../../../apis/userAPI";
import { apigetProject } from "../../../../apis/projectAPI";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import "./ProjectManagement.scss";
import Table from "react-bootstrap/Table";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import * as yup from "yup";

function ProjectManagement() {
  const [dataGetProject, setDataGetProject] = useState();
  console.log(dataGetProject);
  const getUserById = async (idProject) => {
    try {
      await apiGetUserById(idProject);
    } catch (error) {
      console.log(error);
    }
  };
  const getProject = async () => {
    try {
      const data = await apigetProject();
      setDataGetProject(data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div>
      <div>
        <h1 className="text-center text-info">Project Management</h1>
      </div>
      <div></div>
      <div className="mt-4">
        <Table bordered hover>
          <thead>
            <tr className="text-dark text-center">
              <th>ID</th>
              <th>Project Name</th>
              <th>Category</th>
              <th>Creator</th>
              <th>Menbers</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataGetProject?.map((data, index) => {
              return (
                <tr className="text-dark text-center" key={index}>
                  <td>{data.id}</td>
                  <td>{data.projectName}</td>
                  <td>{data.categoryName}</td>
                  <td>{data.creator.name}</td>
                  <td>SĐT</td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
          <Modal className="Modal-background">
            <Modal.Header className="text-dark">
              <Modal.Title>Sửa thông tin người dùng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>id</Form.Label>
                    <Form.Control placeholder="id" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Tên Tài Khoản</Form.Label>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Số Điện Thoại</Form.Label>
                    <Form.Control type="phone" />
                  </Form.Group>
                </Row>
                {/* {errorSignUp && (
                  <Alert className="mb-3" severity="error">
                    Tài khoản đã được tồn tại !!
                  </Alert>
                )} */}
              </Form>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Cập nhật</Button>
              <Button>Đóng</Button>
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
