import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Signup.module.scss";
import { apiSignup } from "../../../apis/userAPI";
import Alert from "@mui/material/Alert";
const schema = yup.object({
  email: yup.string().email().required("email không được để trống"),
  passWord: yup.string().required("Mật khẩu không được để trống"),
  name: yup.string().required("Tên không được để trống"),
  phoneNumber: yup.number().required("Số điện thoại không được để trống"),
});

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // declare initial value for inputs
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });
  const [errorSignUp, setErrorSignUp] = useState("");
  const onSubmit = async (value) => {
    console.log("value", value);
    try {
      await apiSignup(value);
      navigate("/login");
    } catch (error) {
      setErrorSignUp(error);
      console.log(error);
    }
  };

  return (
    <div className={`${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Đăng Ký</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Mật Khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật Khẩu"
                {...register("passWord")}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Tên Tài Khoản</Form.Label>
              <Form.Control placeholder="Name" {...register("name")} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Số Điện Thoại</Form.Label>
              <Form.Control
                type="phone"
                placeholder="phone"
                {...register("phoneNumber")}
              />
            </Form.Group>
          </Row>
          {errorSignUp && (
            <Alert className="mb-3" severity="error">
              Tài khoản đã được tồn tại !!
            </Alert>
          )}
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            className="btn-lg"
            type="submit"
          >
            Submit
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
}

export default Signup;
