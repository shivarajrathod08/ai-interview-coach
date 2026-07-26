import { Card, Badge } from "../common";
import { formatScore } from "../../utils/formatters";

const InterviewSummaryPanel = ({ summary }) => {
  if (!summary) return null;

  const { jobRole, overallScore, answers = [] } = summary;

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {jobRole ? `Overall score · ${jobRole}` : "Overall score"}
        </span>
        <span className="font-display text-5xl font-bold text-primary-500">
          {formatScore(overallScore)}
        </span>
      </Card>

      {answers.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base font-semibold text-ink-light dark:text-ink-dark">
            Question-by-question feedback
          </h3>
          {answers.map((item, index) => (
            <Card key={item.questionId || index}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink-light dark:text-ink-dark">
                  {item.questionText}
                </p>
                <Badge variant="progress">{formatScore(item.score)}</Badge>
              </div>
              <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-accent-success">Strengths: </span>
                {item.strengths || "—"}
              </p>
              <p className="mb-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-accent-warning">Weaknesses: </span>
                {item.weaknesses || "—"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Topics to revise: </span>
                {item.topicsToRevise || "—"}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-slate-400">No answers were recorded for this session.</p>
      )}
    </div>
  );
};

export default InterviewSummaryPanel;
