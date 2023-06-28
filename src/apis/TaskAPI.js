import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";
const gettaskAPI = async () => {
  const { data } = await axiosAdmin.get("/Project/getTaskDetail");
  return data;
};

const getStatus = async () => {
  const { data } = await axiosClient.get("/Status/getAll");
  return data;
};
const getPriority = async () => {
  const { data } = await axiosClient.get("/Priority/getAll");
  return data;
};

const getAssignUserTask = async (values) => {
  const { data } = await axiosAdmin.post("/Project/assignUserTask", values);
  return data;
};

const getAssignUserProject = async (values) => {
  const { data } = await axiosAdmin.post("/Project/assignUserProject", values);
  return data;
};

const apiCreateTask = async (values) => {
  const { data } = await axiosAdmin.post("/Project/createTask", values);
  return data;
};

const apiUpdateTask = async (values) => {
  const { data } = await axiosAdmin.post("/Project/updateTask", values);
  return data;
};

const getTaskType = async () => {
  const { data } = await axiosClient.get("/TaskType/getAll");
  return data;
};

export {
  gettaskAPI,
  getStatus,
  getTaskType,
  getPriority,
  getAssignUserTask,
  apiCreateTask,
  getAssignUserProject,
  apiUpdateTask,
};
