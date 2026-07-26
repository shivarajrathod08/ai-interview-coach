import { Badge } from "../common";
import { INTERVIEW_STATUS } from "../../constants/appConstants";

const BADGE_VARIANT = {
  [INTERVIEW_STATUS.PENDING]: "pending",
  [INTERVIEW_STATUS.IN_PROGRESS]: "progress",
  [INTERVIEW_STATUS.COMPLETED]: "completed",
};

const InterviewStatusBadge = ({ status }) => {
  return <Badge variant={BADGE_VARIANT[status] || "neutral"}>{status?.replace("_", " ")}</Badge>;
};

export default InterviewStatusBadge;
