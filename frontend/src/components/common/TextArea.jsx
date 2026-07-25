const TextArea = ({ label, name, error, rows = 5, className = "", id, ...rest }) => {
  const areaId = id || name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={areaId} className="text-sm font-medium text-ink-light dark:text-ink-dark">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        name={name}
        rows={rows}
        className={`w-full resize-none rounded-xl border bg-white dark:bg-surface-dark px-3.5 py-2.5 text-sm text-ink-light dark:text-ink-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors ${
          error ? "border-accent-danger" : "border-slate-200 dark:border-slate-700"
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-accent-danger">{error}</span>}
    </div>
  );
};

export default TextArea;
