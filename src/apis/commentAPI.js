import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";

export const apiGetComment = async (values) => {
  const { data } = await axiosClient.get("/Comment/getAll", {
    params: { taskId: values },
  });
  return data;
};

export const apiInsertComment = async (values) => {
  const { data } = await axiosAdmin.post("/Comment/insertComment", values);
  return data;
};

export const apiUpdateComment = async (values) => {
  const { data } = await axiosAdmin.put("/Comment/updateComment", values);
  return data;
};

export const apiDeleteComment = async (values) => {
  const { data } = await axiosAdmin.delete("/Comment/deleteComment", {
    params: { idComment: values },
  });
  return data;
};
