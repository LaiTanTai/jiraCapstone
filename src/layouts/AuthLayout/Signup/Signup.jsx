import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  InputGroup,
  Button,
} from "react-bootstrap";

import styles from "./Signup.module.scss";

function Signup() {
  return (
    <div className={`${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Đăng Ký</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control className="py-2" type="email" placeholder="Email" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Mật Khẩu</Form.Label>
              <Form.Control
                className="py-2"
                type="password"
                placeholder="Mật Khẩu"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Tên Tài Khoản</Form.Label>
              <Form.Control className="py-2" placeholder="Name" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Số Điện Thoại</Form.Label>
              <Form.Control className="py-2" type="phone" placeholder="phone" />
            </Form.Group>
          </Row>

          <Button variant="primary" className="btn-lg" type="submit">
            Submit
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
}

export default Signup;
