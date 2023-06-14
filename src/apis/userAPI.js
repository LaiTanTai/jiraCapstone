import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";

export const apiSignin = async (values) => {
  const { data } = await axiosClient.post("/Users/signin", values);
  return data;
};

export const apiSignup = async (values) => {
  const { data } = await axiosClient.post("/Users/signup", values);
  return data;
};

export const apiGetUser = async () => {
  const { data } = await axiosAdmin.get("/Users/getUser");
  return data;
};

export const apiDeleteUser = async (values) => {
  const { data } = await axiosAdmin.delete("/Users/deleteUser", {
    params: { id: values },
  });
  return data;
};

export const apiUpdateUser = async (values) => {
  const { data } = await axiosClient.put("/Users/editUser", values);
  return data;
};
