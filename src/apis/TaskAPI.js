import axiosAdmin from "./axiosAdmin";
const gettaskAPI = async ()=>{
    const {data} = await axiosAdmin.get("/Project/getTaskDetail")
    return data;
}
export {
    gettaskAPI
}