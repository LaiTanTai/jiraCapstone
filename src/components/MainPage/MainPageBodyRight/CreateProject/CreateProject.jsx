import React, { useRef, useState, useEffect } from "react";
import {
  apiCreateProject,
  apiProjectCategory,
} from "../../../../apis/projectAPI";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  Pagination,
  Button,
} from "react-bootstrap";
import style from "./CreateProject.module.scss";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
// import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Editor } from "@tinymce/tinymce-react";

const schema = yup.object({
  projectName: yup.string().required("Tên dự án không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
});

function CreateProject() {
  const [category, setCategory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // declare initial value for inputs
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    mode: "onTouched",
    // Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });

  const getListCategory = async () => {
    try {
      const data = await apiProjectCategory();
      const newData = data.content;
      const newListSystem = newData.map((item) => {
        return item.projectCategoryName;
      });

      setCategory(newListSystem);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (value) => {
    console.log("value", value);
    try {
      const data = await apiCreateProject(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListCategory();
  }, []);

  const editorRef = useRef(null);
  const handleDescription = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      return editorRef.current.getContent();
    }
  };

  return (
    <div className={`mt-4 ${style.inputSchedule}`}>
      <div>
        <h3 className="text-dark">Create Project</h3>
      </div>
      <div className={`mt-4`}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark">Name</Form.Label>
              <Form.Control
                placeholder="Tên dự án"
                {...register("projectName")}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword"></Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Description"
                {...register("description")}
              />
              {/* <Editor
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
              /> */}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail"></Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="text-dark">CategoryId</Form.Label>
              <Form.Select
                {...register("categoryId")}
                onChange={getListCategory}
              >
                <option>Chọn dự án</option>
                <option value="1">{category[0]}</option>
                <option value="2">{category[1]}</option>
                <option value="3">{category[2]}</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail"></Form.Group>
          </Row>

          <Button onClick={handleSubmit(onSubmit)} type="submit">
            Create Project
          </Button>
        </Form>{" "}
      </div>
    </div>
  );
}

export default CreateProject;
