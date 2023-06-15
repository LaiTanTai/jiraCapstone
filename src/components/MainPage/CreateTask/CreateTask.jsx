import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./CreateTask.module.scss";
import { apiSignup } from "../../../apis/userAPI";
import Alert from "@mui/material/Alert";
import { Editor } from "@tinymce/tinymce-react";

const schema = yup.object({
  email: yup.string().email().required("email không được để trống"),
  passWord: yup.string().required("Mật khẩu không được để trống"),
  name: yup.string().required("Tên không được để trống"),
  phoneNumber: yup.number().required("Số điện thoại không được để trống"),
});

function CreateTask() {
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

  const editorRef = useRef(null);
  const handleDescription = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      return editorRef.current.getContent();
    }
  };

  return (
    <div className={`${styles.bannerBackGround}`}>
      <div className={`${styles.feature} `}>
        <h1 className={`${styles.text} text-center mb-4`}>Create Task</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className={styles.label}>Project</Form.Label>
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
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
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
                onEditorChange={handleDescription}
                {...register("description")}
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

export default CreateTask;
