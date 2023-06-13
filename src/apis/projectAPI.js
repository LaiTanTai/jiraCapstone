import axiosClient from "./axiosClient";

export const apiCreateProject = async (values) => {
  const { data } = await axiosClient.post("/Project/createProject", values);
  return data;
};
