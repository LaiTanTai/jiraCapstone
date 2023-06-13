import axiosClient from "./axiosClient";

export const apiCreateProject = async (values) => {
  const { data } = await axiosClient.post("/Project/createProject", values);
  return data;
};
export const apigetProject = async (name)=>{
  const {data} = await axiosClient.get("/Project/getAllProject",{
    params:{
      keyword:name
    }
  })
  return data
}