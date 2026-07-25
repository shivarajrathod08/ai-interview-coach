import { Link } from "react-router-dom";
import { Card, Badge, EmptyState } from "../common";
import { buildInterviewSessionRoute } from "../../constants/routes";
import { formatDate } from "../../utils/formatters";
import { INTERVIEW_STATUS } from "../../constants/appConstants";

const BADGE_VARIANT = {
  [INTERVIEW_STATUS.PENDING]: "pending",
  [INTERVIEW_STATUS.IN_PROGRESS]: "progress",
  [INTERVIEW_STATUS.COMPLETED]: "completed",
};

const RecentInterviewsList = ({ interviews = [] }) => {
  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No interviews yet"
        description="Start your first mock interview to see it show up here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {interviews.map((interview) => (
        <Link key={interview.id} to={buildInterviewSessionRoute(interview.id)}>
          <Card className="flex items-center justify-between !p-4 transition-shadow hover:shadow-elevated">
            <div>
              <p className="font-medium text-ink-light dark:text-ink-dark">{interview.title}</p>
              <p className="text-xs text-slate-400">{formatDate(interview.createdAt)}</p>
            </div>
            <Badge variant={BADGE_VARIANT[interview.status] || "neutral"}>
              {interview.status?.replace("_", " ")}
            </Badge>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecentInterviewsList;
