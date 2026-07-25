import { Card } from "../common";

const StatsCard = ({ label, value, hint }) => {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-display text-3xl font-bold text-ink-light dark:text-ink-dark">
        {value}
      </span>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </Card>
  );
};

export default StatsCard;
