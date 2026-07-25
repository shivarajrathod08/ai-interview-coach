import { useEffect, useState } from "react";
import { formatDuration } from "../../utils/formatters";

const InterviewTimer = ({ startedAt }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [startedAt]);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-300">
      ⏱ {formatDuration(elapsedSeconds)}
    </span>
  );
};

export default InterviewTimer;
