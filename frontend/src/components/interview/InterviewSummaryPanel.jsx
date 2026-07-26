import { Card, Badge } from "../common";
import { formatScore } from "../../utils/formatters";

const InterviewSummaryPanel = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Job Role
        </span>

        <h2 className="font-display text-2xl font-bold text-ink-light dark:text-ink-dark">
          {summary.jobRole}
        </h2>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          Overall Score
        </span>

        <span className="font-display text-5xl font-bold text-primary-500">
          {formatScore(summary.overallScore)}
        </span>

        <Badge variant="progress">
          {summary.status}
        </Badge>
      </Card>

      <div className="flex flex-col gap-4">
        <h3 className="font-display text-lg font-semibold text-ink-light dark:text-ink-dark">
          Question-by-Question Analysis
        </h3>

        {(summary.answers || []).map((answer) => (
          <Card key={answer.questionId}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-ink-light dark:text-ink-dark">
                  {answer.questionText}
                </h4>

                <Badge variant="progress">
                  {formatScore(answer.score)}
                </Badge>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Your Answer
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {answer.answerText}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-green-600">
                  Strengths
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {answer.strengths || "No strengths provided."}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-red-500">
                  Weaknesses
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {answer.weaknesses || "No weaknesses provided."}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-blue-600">
                  Topics to Revise
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {answer.topicsToRevise || "No revision topics."}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InterviewSummaryPanel;