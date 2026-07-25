import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const getDashboard = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD);
  return response.data;
};
