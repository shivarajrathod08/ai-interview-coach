import { Card, Badge } from "../common";
import { formatScore } from "../../utils/formatters";

const InterviewSummaryPanel = ({ summary }) => {
  if (!summary) return null;

  const {
    overallScore,
    strengths = [],
    improvementAreas = [],
    questionFeedback = [],
  } = summary;

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">Overall score</span>
        <span className="font-display text-5xl font-bold text-primary-500">
          {formatScore(overallScore)}
        </span>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-display text-base font-semibold text-ink-light dark:text-ink-dark">
            Strengths
          </h3>
          <ul className="flex flex-col gap-2">
            {strengths.length > 0 ? (
              strengths.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-0.5 text-accent-success">✓</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400">No standout strengths recorded.</li>
            )}
          </ul>
        </Card>

        <Card>
          <h3 className="mb-3 font-display text-base font-semibold text-ink-light dark:text-ink-dark">
            Areas to improve
          </h3>
          <ul className="flex flex-col gap-2">
            {improvementAreas.length > 0 ? (
              improvementAreas.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="mt-0.5 text-accent-warning">!</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400">No specific gaps flagged.</li>
            )}
          </ul>
        </Card>
      </div>

      {questionFeedback.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-base font-semibold text-ink-light dark:text-ink-dark">
            Question-by-question feedback
          </h3>
          {questionFeedback.map((item, index) => (
            <Card key={item.questionId || index}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink-light dark:text-ink-dark">
                  {item.question}
                </p>
                <Badge variant="progress">{formatScore(item.score)}</Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.feedback}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewSummaryPanel;
