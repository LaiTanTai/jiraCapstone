import axiosClient from "./axiosClient";

export const apiLoginFb = async (values) => {
  const { data } = await axiosClient.post("/Users/facebooklogin", values);
  return data;
};
