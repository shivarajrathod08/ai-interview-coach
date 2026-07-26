const TYPE_STYLES = {
  success: "border-l-4 border-accent-success",
  error: "border-l-4 border-accent-danger",
  warning: "border-l-4 border-accent-warning",
  info: "border-l-4 border-primary-500",
};

const TYPE_ICON = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

const Toast = ({ toast, onDismiss }) => {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl bg-white dark:bg-slate-900 px-4 py-3 shadow-elevated ${TYPE_STYLES[toast.type]}`}
    >
      <span className="mt-0.5 text-sm font-semibold text-ink-light dark:text-ink-dark">
        {TYPE_ICON[toast.type]}
      </span>
      <p className="flex-1 text-sm text-ink-light dark:text-ink-dark">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
