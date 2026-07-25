export const API_ENDPOINTS = {
  AUTH_REGISTER: "/auth/register",
  AUTH_LOGIN: "/auth/login",
  DASHBOARD: "/dashboard",
  INTERVIEWS: "/interviews",
  INTERVIEW_BY_ID: (id) => `/interviews/${id}`,
  INTERVIEW_ANSWERS: (id) => `/interviews/${id}/answers`,
  INTERVIEW_SUMMARY: (id) => `/interviews/${id}/summary`,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};
