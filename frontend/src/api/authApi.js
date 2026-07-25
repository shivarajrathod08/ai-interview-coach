import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const register = async (payload) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH_REGISTER, payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH_LOGIN, payload);
  return response.data;
};
