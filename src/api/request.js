import {axiosInstance} from "./config";

// banner
export const getTodayRequest = () => {
  return axiosInstance.get("RequestJson/today.json");
};