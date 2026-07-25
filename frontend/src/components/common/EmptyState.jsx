const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 px-6 py-14 text-center">
      <h3 className="font-display text-lg font-semibold text-ink-light dark:text-ink-dark">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
