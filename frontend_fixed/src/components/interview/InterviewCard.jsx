import { Link } from "react-router-dom";
import { Card } from "../common";
import InterviewStatusBadge from "./InterviewStatusBadge";
import { buildInterviewSessionRoute, buildInterviewSummaryRoute } from "../../constants/routes";
import { formatDate } from "../../utils/formatters";
import { INTERVIEW_STATUS } from "../../constants/appConstants";

const InterviewCard = ({ interview }) => {
  const targetRoute =
    interview.status === INTERVIEW_STATUS.COMPLETED
      ? buildInterviewSummaryRoute(interview.id)
      : buildInterviewSessionRoute(interview.id);

  return (
    <Link to={targetRoute}>
      <Card className="flex h-full flex-col justify-between gap-4 transition-shadow hover:shadow-elevated">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold text-ink-light dark:text-ink-dark">
              {interview.jobRole}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{interview.experienceLevel}</p>
          </div>
          <InterviewStatusBadge status={interview.status} />
        </div>
        <p className="text-xs text-slate-400">Created {formatDate(interview.createdAt)}</p>
      </Card>
    </Link>
  );
};

export default InterviewCard;
