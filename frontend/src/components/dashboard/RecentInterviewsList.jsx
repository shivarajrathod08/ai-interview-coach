import { Link } from "react-router-dom";
import { Card, Badge, EmptyState } from "../common";
import { buildInterviewSummaryRoute } from "../../constants/routes";
import { formatDate } from "../../utils/formatters";

const RecentInterviewsList = ({ interviews = [] }) => {
  if (interviews.length === 0) {
    return (
      <EmptyState
        title="No interviews yet"
        description="Complete an interview to see it appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {interviews.map((interview) => (
        <Link
          key={interview.sessionId}
          to={buildInterviewSummaryRoute(interview.sessionId)}
        >
          <Card className="flex items-center justify-between !p-4 transition-shadow hover:shadow-elevated">
            <div>
              <p className="font-medium text-ink-light dark:text-ink-dark">
                {interview.jobRole}
              </p>

              <p className="text-xs text-slate-400">
                {formatDate(interview.createdAt)}
              </p>
            </div>

            <Badge variant="progress">
              {Math.round(interview.score)}%
            </Badge>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecentInterviewsList;