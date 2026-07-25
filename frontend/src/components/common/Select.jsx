const Select = ({ label, name, error, options = [], className = "", id, ...rest }) => {
  const selectId = id || name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink-light dark:text-ink-dark">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        className={`w-full rounded-xl border bg-white dark:bg-surface-dark px-3.5 py-2.5 text-sm text-ink-light dark:text-ink-dark focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors ${
          error ? "border-accent-danger" : "border-slate-200 dark:border-slate-700"
        } ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-accent-danger">{error}</span>}
    </div>
  );
};

export default Select;
