const PerformanceChart = ({ scores = [] }) => {
  const hasData = scores.length > 0;
  const max = hasData ? Math.max(...scores.map((s) => s.score), 1) : 1;

  return (
    <div className="flex h-40 items-end gap-2">
      {hasData ? (
        scores.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-lg bg-primary-400 dark:bg-primary-600 transition-all"
              style={{ height: `${(point.score / max) * 100}%`, minHeight: "4px" }}
              title={`${point.label}: ${point.score}%`}
            />
            <span className="text-[10px] text-slate-400">{point.label}</span>
          </div>
        ))
      ) : (
        <p className="w-full text-center text-sm text-slate-400">
          Complete an interview to see your trend here.
        </p>
      )}
    </div>
  );
};

export default PerformanceChart;
