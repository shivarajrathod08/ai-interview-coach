import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

export const getInterviews = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.INTERVIEWS);
    return response.data;
};

export const createInterview = async (payload) => {
    const response = await axiosInstance.post(API_ENDPOINTS.INTERVIEWS, payload);
    return response.data;
};

export const getInterviewById = async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.INTERVIEW_BY_ID(id));
    return response.data;
};

export const submitAnswer = async (id, payload) => {
    const response = await axiosInstance.post(API_ENDPOINTS.INTERVIEW_ANSWERS(id), payload);
    return response.data;
};

export const getInterviewSummary = async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.INTERVIEW_SUMMARY(id));
    return response.data;
};
