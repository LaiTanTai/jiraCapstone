import axiosClient from "./axiosClient";

export const apiSignin = async (values) => {
  const { data } = await axiosClient.post("/Users/signin", values);
  return data;
};

export const apiSignup = async (values) => {
  const { data } = await axiosClient.post("/Users/signup", values);
  return data;
};
