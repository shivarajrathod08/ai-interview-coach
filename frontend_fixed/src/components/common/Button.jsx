const VARIANT_CLASSES = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-400 disabled:bg-primary-300",
  secondary:
    "bg-transparent text-primary-600 dark:text-primary-300 border border-primary-300 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/40 focus-visible:ring-primary-400",
  ghost:
    "bg-transparent text-ink-light dark:text-ink-dark hover:bg-black/5 dark:hover:bg-white/5 focus-visible:ring-primary-400",
  danger:
    "bg-accent-danger text-white hover:bg-red-700 focus-visible:ring-red-400 disabled:bg-red-300",
};

const SIZE_CLASSES = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-dark disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
};

export default Button;
