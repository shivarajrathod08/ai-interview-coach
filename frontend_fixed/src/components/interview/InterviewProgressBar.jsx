import { ProgressBar } from "../common";

const InterviewProgressBar = ({ current, total }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span>{Math.round(((current + 1) / total) * 100)}%</span>
      </div>
      <ProgressBar value={current + 1} max={total} />
    </div>
  );
};

export default InterviewProgressBar;
