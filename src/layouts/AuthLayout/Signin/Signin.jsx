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

import styles from "./Signin.module.scss";

function Signin() {
  return (
    <div className={`${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Đăng Nhập</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control className="py-2" type="email" placeholder="Email" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                className="py-2"
                type="password"
                placeholder="Mật Khẩu"
              />
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

export default Signin;
