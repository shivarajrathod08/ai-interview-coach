import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { AuthLayout, DashboardLayout } from "../components/layout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import InterviewListPage from "../pages/interview/InterviewListPage";
import CreateInterviewPage from "../pages/interview/CreateInterviewPage";
import InterviewSessionPageWrapper from "../pages/interview/InterviewSessionPageWrapper";
import InterviewSummaryPage from "../pages/interview/InterviewSummaryPage";
import NotFoundPage from "../pages/errors/NotFoundPage";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.INTERVIEWS} element={<InterviewListPage />} />
          <Route path={ROUTES.INTERVIEW_NEW} element={<CreateInterviewPage />} />
          <Route path={ROUTES.INTERVIEW_SESSION} element={<InterviewSessionPageWrapper />} />
          <Route path={ROUTES.INTERVIEW_SUMMARY} element={<InterviewSummaryPage />} />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
