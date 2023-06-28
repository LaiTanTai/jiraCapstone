import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./Signin.module.scss";
import { apiSignup } from "../../../apis/userAPI";
import { apiLoginFb } from "../../../apis/loginfb";
// import FacebookLogin from "react-facebook-login";
import { signin } from "../../../slice/userslice";
import Alert from "@mui/material/Alert";

const schema = yup.object({
  email: yup.string().email().required("email không được để trống"),
  passWord: yup.string().required("Mật khẩu không được để trống"),
});

function Signin() {
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
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [accessFace, setAccessFace] = useState("");

  const responseFacebook = async (response) => {
    const accessToken = {
      facebookToken: response.accessToken,
    };
    console.log("access", accessToken);
    const data = await apiLoginFb(accessToken);
    localStorage.setItem("user", JSON.stringify(data.content));
    navigate("/Main");
  };
  const onSubmit = (values) => {
    dispatch(signin(values));
    onError();
  };
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const onError = () => {
    setErrorSignIn(true);
    setIsRegistered(true);
  };

  // Kiểm tra nếu có thông tin user => đã đăng nhập => điều hướng về trang Home
  if (user) {
    const url = searchParams.get("redirectUrl") || "/Main";
    return <Navigate to={url} />;
  }

  const handleRegister = () => {
    return navigate("/register");
  };

  return (
    <div className={`text-center ${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Đăng Nhập</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                className="py-2"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                className="py-2"
                type="password"
                placeholder="Mật Khẩu"
                {...register("passWord")}
              />
            </Form.Group>
          </Row>

          {errorSignIn && (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          )}

          {isRegistered && (
            <Button
              variant="primary"
              className="btn-lg me-2"
              type="button"
              onClick={handleRegister}
            >
              Sign up
            </Button>
          )}
          <Button
            variant="primary"
            className="btn-lg"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Form>{" "}
        <div>
          {/* <FacebookLogin
            appId="217248044557849"
            autoLoad={false}
            size="medium"
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            textButton="Login facebook(mất acc)"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Signin;
