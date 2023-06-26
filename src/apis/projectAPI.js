import axiosAdmin from "./axiosAdmin";
import axiosClient from "./axiosClient";

const apiCreateProject = async (values) => {
  const { data } = await axiosAdmin.post(
    "/Project/createProjectAuthorize",
    values
  );
  return data;
};
const apigetProjectDetail = async (value) => {
  const { data } = await axiosAdmin.get("/Project/getProjectDetail", {
    params: {
      id: 12863,
    },
  });
  return data;
};
const apiProjectCategory = async (values) => {
  const { data } = await axiosClient.get("/Projectcategory", values);
  return data;
};

const apigetProject = async (name) => {
  const { data } = await axiosClient.get("/Project/getAllProject", {
    params: {
      keyword: name || undefined,
    },
  });
  return data;
};
const apiremoveUser = async (values) => {
  const { data } = await axiosAdmin.post(
    "/Project/removeUserFromProject",
    values
  );
  return data;
};

const apiremoveProject = async (values) => {
  const { data } = await axiosAdmin.delete("/Project/deleteProject", {
    params: {
      projectId: values || undefined,
    },
  });
  return data;
};
const apiupdateProject = async (id, values) => {
  const { data } = await axiosAdmin.put(
    `/Project/updateProject?projectId=${id}`,
    values
  );
  return data;
};

const apiGetProjectDetail = async (id) => {
  const { data } = await axiosAdmin.get("/Project/getProjectDetail", {
    params: {
      projectId: id || undefined,
    },
  });
  return data;
};

const apiGetTaskDetail = async (id) => {
  const { data } = await axiosAdmin.get("/Project/getTaskDetail", {
    params: {
      taskId: id || undefined,
    },
  });
  return data;
};

export {
  apigetProjectDetail,
  apiCreateProject,
  apiProjectCategory,
  apigetProject,
  apiremoveUser,
  apiremoveProject,
  apiupdateProject,
  apiGetProjectDetail,
  apiGetTaskDetail,
};
