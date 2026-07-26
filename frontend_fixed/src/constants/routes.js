export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  INTERVIEWS: "/interviews",
  INTERVIEW_NEW: "/interviews/new",
  INTERVIEW_SESSION: "/interviews/:id",
  INTERVIEW_SUMMARY: "/interviews/:id/summary",
  NOT_FOUND: "*",
};

export const buildInterviewSessionRoute = (id) => `/interviews/${id}`;
export const buildInterviewSummaryRoute = (id) => `/interviews/${id}/summary`;
