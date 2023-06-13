import axiosClient from "./axiosClient";

const apiCreateProject = async (values) => {
  const { data } = await axiosClient.post("/Project/createProject", values);
  return data;
};


const apiProjectCategory = async (values) => {
  const { data } = await axiosClient.get("/Projectcategory", values);
  return data;
};

const apigetProject = async (name)=>{
  const {data} = await axiosClient.get("/Project/getAllProject",{
    params:{
      keyword:name
    }
  })
  return data
}
export {
  apiCreateProject,
  apiProjectCategory,
  apigetProject
}